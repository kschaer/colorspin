const { db, Color, Palette } = require("./db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    const [red, orange, yellow, blue] = await Promise.all([
      Color.create({
        name: "red",
        hex: "910511"
      }),
      Color.create({
        name: "orange",
        hex: "fc8b28"
      }),
      Color.create({
        name: "yellow",
        hex: "ffff28"
      }),
      Color.create({
        name: "blue",
        hex: "132e7c"
      })
    ]);
    const [firstPalette, secondPalette] = await Promise.all([
      Palette.create({
        name: "firstPalette"
      }),
      Palette.create({
        name: "secondPalette"
      })
    ]);
    await firstPalette.setColors([red, orange, yellow]);
    await secondPalette.setColors([red, yellow, blue]);
    db.close();
    console.log("seed success!");
  } catch (err) {
    db.close();
    console.log("error seeding,", err);
  }
};

seed();
