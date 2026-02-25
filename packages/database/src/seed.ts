import { prisma } from "./index.js";

async function seed() {
  console.log("🌱 Seeding database...");

  // Créer une release de test
  await prisma.release.upsert({
    where: { version: "1.0.0" },
    update: {},
    create: {
      version: "1.0.0",
      releaseDate: new Date(),
      releaseNotes: "Initial release of Nemesis Launcher",
      isLatest: true,
      sha512: "placeholder-sha512-will-be-replaced-during-build",
      fileSize: 0,
    },
  });

  console.log("✅ Database seeded!");
}

seed()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
