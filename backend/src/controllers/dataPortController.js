const prisma = require("../config/prisma");
const ExcelJS = require("exceljs");

// ─── Column layout ───
// | Title | Artist | Release Year | Description | Cover URL |
const HEADERS = ["Title", "Artist", "Release Year", "Description", "Cover URL"];

// ────────────────────────── IMPORT ──────────────────────────

const importFromExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не завантажено" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    let importedCount = 0;
    let skippedCount = 0;

    for (const worksheet of workbook.worksheets) {
      const genreName = worksheet.name.trim();
      if (!genreName) continue;

      // Find or create genre
      let genre = await prisma.genres.findUnique({ where: { name: genreName } });
      if (!genre) {
        genre = await prisma.genres.create({ data: { name: genreName } });
      }

      // Iterate rows (skip header row 1)
      worksheet.eachRow({ includeEmpty: false }, () => {}); // force parse
      const rowCount = worksheet.rowCount;

      for (let rowIdx = 2; rowIdx <= rowCount; rowIdx++) {
        const row = worksheet.getRow(rowIdx);
        const title = (row.getCell(1).value || "").toString().trim();
        const artistName = (row.getCell(2).value || "").toString().trim();
        const releaseYear = parseInt(row.getCell(3).value, 10) || 0;
        const description = (row.getCell(4).value || "").toString().trim() || null;
        const coverUrl = (row.getCell(5).value || "").toString().trim() || null;

        if (!title || !artistName || !releaseYear) {
          skippedCount++;
          continue;
        }

        // Find or create artist
        let artist = await prisma.artists.findFirst({ where: { name: artistName } });
        if (!artist) {
          artist = await prisma.artists.create({ data: { name: artistName } });
        }

        // Check for duplicate album (same title + same artist)
        const existingAlbum = await prisma.albums.findFirst({
          where: { title, artist_id: artist.id },
        });

        if (existingAlbum) {
          skippedCount++;
          continue;
        }

        // Create album & link to genre
        await prisma.albums.create({
          data: {
            title,
            release_year: releaseYear,
            description,
            cover_url: coverUrl,
            artist_id: artist.id,
            albums_genres: {
              create: { genre_id: genre.id },
            },
          },
        });

        importedCount++;
      }
    }

    res.json({
      message: "Імпорт завершено",
      imported: importedCount,
      skipped: skippedCount,
    });
  } catch (error) {
    next(error);
  }
};

// ────────────────────────── EXPORT ──────────────────────────

const exportToExcel = async (req, res, next) => {
  try {
    // Get all genres with their albums
    const genres = await prisma.genres.findMany({
      include: {
        albums_genres: {
          include: {
            albums: {
              include: {
                artists: true,
              },
            },
          },
        },
      },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Music Library";
    workbook.created = new Date();

    for (const genre of genres) {
      const sheetName = genre.name.substring(0, 31); // Excel sheet name max 31 chars
      const worksheet = workbook.addWorksheet(sheetName);

      // Header row
      const headerRow = worksheet.addRow(HEADERS);
      headerRow.font = { bold: true };
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF2A333E" },
        };
        cell.font = { bold: true, color: { argb: "FFFEFFD3" } };
      });

      // Column widths
      worksheet.columns = [
        { width: 30 },
        { width: 25 },
        { width: 14 },
        { width: 40 },
        { width: 35 },
      ];

      // Data rows
      for (const ag of genre.albums_genres) {
        const album = ag.albums;
        worksheet.addRow([
          album.title,
          album.artists?.name || "",
          album.release_year,
          album.description || "",
          album.cover_url || "",
        ]);
      }
    }

    // If no genres exist, create an empty template sheet
    if (genres.length === 0) {
      const ws = workbook.addWorksheet("Genre Name");
      const headerRow = ws.addRow(HEADERS);
      headerRow.font = { bold: true };
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const filename = `music_library_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    next(error);
  }
};

module.exports = { importFromExcel, exportToExcel };
