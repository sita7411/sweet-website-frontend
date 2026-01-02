import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const items = [
  { name: "Home Baked Apple Pie", qty: 6, unit: "slice", rate: 1.64 },
  { name: "Glazed Yeast Doughnuts", qty: 15, unit: "piece", rate: 1.5 },
  { name: "Chocolate Chip Cookies", qty: 100, unit: "cookie", rate: 2 },
];

export default function InvoicePage() {
  const subtotal = items.reduce((a, b) => a + b.qty * b.rate, 0);

  const downloadPDF = async () => {
    const invoice = document.getElementById("invoice-pdf");

    const canvas = await html2canvas(invoice, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      
      {/* ================= INVOICE ================= */}
      <div
        id="invoice-pdf"
        className="bg-white w-[800px] p-10 shadow-lg text-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-bold">Milky Bakery</h2>
            <p className="text-gray-500">Invoice Number: 891</p>
            <p className="text-gray-500">Date: 02/02/2022</p>
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-blue-700">
            INVOICE
          </h1>
        </div>

        {/* Bill Info */}
        <div className="grid grid-cols-2 gap-6 py-6 border-b">
          <div>
            <h4 className="font-semibold mb-1">Bill From</h4>
            <p>Company Name</p>
            <p>Street Address, Zip Code</p>
            <p>Phone Number</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Bill To</h4>
            <p>Customer Name</p>
            <p>Street Address, Zip Code</p>
            <p>Phone Number</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Tax</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{item.name}</td>
                <td>{item.qty} {item.unit}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>0.00</td>
                <td className="text-right">
                  ${(item.qty * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-3 mt-2 bg-blue-700 text-white px-3 font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BUTTON ================= */}
      <button
        onClick={downloadPDF}
        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition"
      >
        Download Invoice PDF
      </button>
    </div>
  );
}
