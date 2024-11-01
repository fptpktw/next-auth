import { query } from "@/app/config/db";

export async function GET(res) {
  try {
    const result = await query("SELECT * FROM hrms_employee LIMIT 20", []);
    return new Response(JSON.stringify({ code: 1, result: result.rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ code: 0, result: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    // อ่าน body request และแปลงเป็น JSON
    const body = await req.json();
    const { startDate } = body; // รับวันที่จาก request body

    // ตรวจสอบว่าได้รับวันที่ครบถ้วน
    if (!startDate) {
      return new Response(
        JSON.stringify({ code: 0, result: "Start date and end date are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query โดยใช้ prepared statement เพื่อป้องกัน SQL Injection
    const queryText = `
      SELECT * FROM hrms_employee 
      WHERE start_date > $1 
      LIMIT 20
    `;

    // ส่งพารามิเตอร์วันที่ในรูปแบบ prepared statement
    const result = await query(queryText, [startDate]);

    return new Response(
      JSON.stringify({ code: 1, result: result.rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(
      JSON.stringify({ code: 0, result: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
