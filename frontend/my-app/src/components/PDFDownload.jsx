// import React from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const PDFDownload = () => {
//     const handleDownload = async () => {
//         const input = document.getElementById('root'); // The root element of your app

//         const canvas = await html2canvas(input);
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'PNG', 0, 0);
//         pdf.save('page.pdf');
//     };

//     return (
//         <div>
//             <h2>Download PDF</h2>
//             <button onClick={handleDownload}>Download PDF</button>
//         </div>
//     );
// };

// export default PDFDownload;
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFDownload = () => {
    const [content, setContent] = useState('Edit this content before generating the PDF.');

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleDownload = async () => {
        const input = document.getElementById('content'); // The element containing the content

        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('page.pdf');
    };

    return (
        <div>
            <h2>Edit and Download PDF</h2>
            <div>
                <textarea id="content" rows="6" cols="40" value={content} onChange={handleContentChange} />
            </div>
            <div>
                <button onClick={handleDownload}>Generate PDF</button>
            </div>
        </div>
    );
};

export default PDFDownload;
