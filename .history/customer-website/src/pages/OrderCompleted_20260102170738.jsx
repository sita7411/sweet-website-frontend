import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Features from "../components/Features/Features";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

/* ================= ORDER DATA - UPDATED TO MATCH THE IMAGE ================= */
const invoiceNumber = "891";
const invoiceDate = "02/01/2026";  // As per current date

const orderItems = [
    { 
        id: 1, 
        title: "Home Baked Apple Pie", 
        quantity: 6, 
        unit: "slice", 
        rate: 1.64, 
        amount: 9.84 
    },
    { 
        id: 2, 
        title: "Glazed Yeast Doughnuts", 
        quantity: 15, 
        unit: "piece", 
        rate: 1.50, 
        amount: 22.50 
    },
    { 
        id: 3, 
        title: "Chocolate Chip Cookies", 
        quantity: 100, 
        unit: "cookie", 
        rate: 2.00, 
        amount: 200.00 
    },
];

const subtotal = 225.89;
const discount = 0.00;
const taxTotal = 0.00;
const paid = 0.00;
const total = 225.89;

/* ================= COMPONENT ================= */
export default function OrderCompleted() {
    const downloadInvoice = async () => {
        const element = document.getElementById("invoice-pdf");

        // Temporarily position offscreen and make visible for capture
        element.style.position = "absolute";
        element.style.left = "-9999px";
        element.style.top = "-9999px";
        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.zIndex = "1000";
        element.style.width = "210mm";
        element.style.minHeight = "297mm";
        element.style.padding = "20mm";
        element.style.boxSizing = "border-box";
        element.style.backgroundColor = "#ffffff";

        // Wait for layout
        await new Promise(res => setTimeout(res, 200));

        // Wait for images to load (logo)
        await Promise.all(
            Array.from(element.querySelectorAll("img")).map(img => 
                new Promise(resolve => {
                    if (img.complete) resolve();
                    else img.onload = img.onerror = resolve;
                })
            )
        );

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${invoiceNumber}.pdf`);

        // Hide again
        element.style.opacity = "0";
        element.style.visibility = "hidden";
        element.style.zIndex = "-1";
    };

    return (
        <div className="min-h-screen">
            {/* Your existing hero, success, order info, mobile/desktop items list, totals, actions - keep as is */}
            {/* ... (all your original JSX from hero to actions remains unchanged) ... */}

            {/* ================= HIDDEN PDF DIV - EXACT REPLICA OF THE IMAGE ================= */}
            <div 
                id="invoice-pdf" 
                className="fixed top-0 left-0 opacity-0 invisible -z-10 bg-white text-black"
                style={{ width: '210mm', minHeight: '297mm', padding: '20mm', boxSizing: 'border-box' }}
            >
                <InvoicePDF />
            </div>

            <Features />
        </div>
    );
}

/* Keep your existing helpers: Info, TotalRow */

/* ================= INVOICE PDF CONTENT - 100% MATCH TO YOUR IMAGE ================= */
function InvoicePDF() {
    return (
        <div className="max-w-4xl mx-auto font-sans text-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                    {/* Logo - using a close matching cow/milk bakery logo */}
                    <img 
                        src="https://thumbs.dreamstime.com/b/farm-fresh-milk-bottle-cow-icon-dairy-products-beverage-branding-stylized-dark-blue-head-peeks-light-filled-412048341.jpg" 
                        alt="Milky Bakery Logo" 
                        className="w-16 h-16 object-contain"
                    />
                    <h1 className="text-2xl font-bold">Milky Bakery</h1>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-bold text-blue-900 pb-1 border-b-8 border-blue-900 inline-block">INVOICE</h2>
                </div>
            </div>

            {/* Invoice Details */}
            <div className="mb-8">
                <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
                <p><strong>Date:</strong> {invoiceDate}</p>
            </div>

            {/* Bill From / Bill To */}
            <div className="grid grid-cols-2 gap-12 mb-10">
                <div>
                    <p className="font-bold mb-2">Bill from:</p>
                    <p>Company Name</p>
                    <p>Street Address, Zip Code</p>
                    <p>Phone Number</p>
                </div>
                <div>
                    <p className="font-bold mb-2">Bill to:</p>
                    <p>Customer Name</p>
                    <p>Street Address, Zip Code</p>
                    <p>Phone Number</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full border border-gray-500 table-fixed mb-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-500 px-4 py-3 text-left">Item</th>
                        <th className="border border-gray-500 px-4 py-3 text-center">Quantity</th>
                        <th className="border border-gray-500 px-4 py-3 text-center">Rate</th>
                        <th className="border border-gray-500 px-4 py-3 text-center">Tax</th>
                        <th className="border border-gray-500 px-4 py-3 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-500 px-4 py-3">
                                {item.title}
                                <br />
                                <span className="text-gray-600 text-xs">per {item.unit}</span>
                            </td>
                            <td className="border border-gray-500 px-4 py-3 text-center">
                                {item.quantity}
                                <br />
                                <span className="text-gray-600 text-xs">{item.unit}</span>
                            </td>
                            <td className="border border-gray-500 px-4 py-3 text-center">
                                ${item.rate.toFixed(2)}
                                <br />
                                <span className="text-gray-600 text-xs">per {item.unit}</span>
                            </td>
                            <td className="border border-gray-500 px-4 py-3 text-center">$0.00</td>
                            <td className="border border-gray-500 px-4 py-3 text-right">${item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary Totals */}
            <div className="flex justify-end mb-8">
                <div className="w-72 space-y-2">
                    <div className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Discount:</span> <span>${discount.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax:</span> <span>${taxTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Paid:</span> <span>${paid.toFixed(2)}</span></div>
                </div>
            </div>

            {/* Final Total Box */}
            <div className="flex justify-end">
                <div className="bg-blue-900 text-white px-12 py-4 rounded-lg">
                    <span className="text-xl font-bold">Total ${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Terms */}
            <div className="mt-16">
                <p className="font-bold">Terms & Conditions:</p>
                {/* Add terms here if needed */}
            </div>
        </div>
    );
}