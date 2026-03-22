const request = require("supertest");
const app = require("../src/index");
const { transactions } = require("../src/data");


beforeEach(() => {
  transactions.length = 0;
  transactions.push(
    {
      id: 1,
      type: "income",
      amount: 500000,
      description: "Uang saku",
      date: "2026-03-22",
    },
    {
      id: 2,
      type: "expense",
      amount: 25000,
      description: "Makan siang",
      date: "2026-03-21",
    }
  );
});

describe("GET /transactions", () => {
  it("harus mengembalikan semua transaksi", async () => {
    const res = await request(app).get("/transactions");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it("harus bisa filter berdasarkan type", async () => {
    const res = await request(app).get("/transactions?type=income");
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].type).toBe("income");
  });

  it("harus return kosong jika type tidak valid", async () => {
    const res = await request(app).get("/transactions?type=invalid");
    expect(res.body.data.length).toBe(0);
  });

  it("harus bisa sort berdasarkan tanggal desc", async () => {
    const res = await request(app).get("/transactions?sort=desc");
    const dates = res.body.data.map(t => new Date(t.date));
    expect(dates[0] >= dates[1]).toBe(true);
  });

  it("harus tetap jalan jika sort tidak valid", async () => {
    const res = await request(app).get("/transactions?sort=random");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /summary", () => {
  it("harus mengembalikan summary yang benar", async () => {
    const res = await request(app).get("/summary");
    expect(res.body.data.total_income).toBe(500000);
    expect(res.body.data.total_expense).toBe(25000);
    expect(res.body.data.balance).toBe(475000);
  });

  it("summary berubah setelah tambah transaksi", async () => {
    await request(app).post("/transactions").send({
      type: "income",
      amount: 50000,
    });

    const res = await request(app).get("/summary");
    expect(res.body.data.total_income).toBe(550000);
  });
});

describe("GET /transactions/:id", () => {
  it("harus mengembalikan data jika ada", async () => {
    const res = await request(app).get("/transactions/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it("harus 404 jika tidak ditemukan", async () => {
    const res = await request(app).get("/transactions/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /transactions", () => {
  it("harus berhasil menambahkan transaksi", async () => {
    const res = await request(app).post("/transactions").send({
      type: "income",
      amount: 100000,
      description: "Bonus",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.type).toBe("income");
  });

  it("harus gagal jika field kurang", async () => {
    const res = await request(app).post("/transactions").send({
      type: "income",
    });

    expect(res.statusCode).toBe(400);
  });

  it("harus pakai default description dan date", async () => {
    const res = await request(app).post("/transactions").send({
      type: "expense",
      amount: 1000,
    });

    expect(res.body.data.description).toBe("No description");
    expect(res.body.data.date).toBeDefined();
  });
});

describe("PUT /transactions/:id", () => {
  it("harus update semua field", async () => {
    const res = await request(app).put("/transactions/1").send({
      type: "expense",
      amount: 99999,
      description: "Updated",
      date: "2026-03-20",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.amount).toBe(99999);
    expect(res.body.data.type).toBe("expense");
  });

  it("harus bisa update sebagian field", async () => {
    const res = await request(app).put("/transactions/1").send({
      amount: 12345,
    });

    expect(res.body.data.amount).toBe(12345);
    expect(res.body.data.type).toBe("income"); // tetap
  });

  it("harus 404 jika id tidak ditemukan", async () => {
    const res = await request(app).put("/transactions/999").send({
      amount: 1,
    });

    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /transactions/:id", () => {
  it("harus berhasil delete transaksi", async () => {
    const res = await request(app).delete("/transactions/1");
    expect(res.statusCode).toBe(200);
    expect(transactions.length).toBe(1);
  });

  it("data benar-benar hilang setelah delete", async () => {
    await request(app).delete("/transactions/1");

    const res = await request(app).get("/transactions/1");
    expect(res.statusCode).toBe(404);
  });

  it("harus 404 jika id tidak ditemukan", async () => {
    const res = await request(app).delete("/transactions/999");
    expect(res.statusCode).toBe(404);
  });
});
