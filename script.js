document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const printBtn = document.getElementById("printBtn");

  searchBtn.addEventListener("click", showResult);

  printBtn.addEventListener("click", function () {
    const element = document.getElementById("printArea");
    const opt = {
      margin: 0,
      filename: 'Scholarship_Result.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  });
});

function showResult() {
  const roll = document.getElementById("rollInput").value.trim();
  const student = students.find(s => s.roll === roll);

  const box = document.getElementById("printArea");
  const printBtn = document.getElementById("printBtn");

  if (!student) {
    alert("এই রোলের রেজাল্ট পাওয়া যায়নি");
    return;
  }

  box.innerHTML = `
    <div class="result-header">
      <img src="logo.png">
      <div>
        <h2>খানসামা উপজেলা কিন্ডারগার্টেন এসোসিয়েশন</h2>
        <h2 class="text-danger text-center">খানসামা,দিনাজপুর </h2>
<h5 class="mb-0 text-center mt-3 ">বৃত্তি পরীক্ষা ২০২৫ – ফলাফল</h5>
      </div>
    </div>

    <table class="table table-bordered result-table">
      <tr><th>নাম</th><td>${student.name}</td></tr>
      <tr><th>রোল</th><td>${student.roll}</td></tr>
      <tr><th>শ্রেণি</th><td>${student.class}</td></tr>
      <tr><th>স্কুল</th><td>${student.school}</td></tr>
      <tr><th>বৃত্তির ধরণ</th><td>${student.scholarship}</td></tr>
      
    </table>
<br>
    <div class="sign-area">
      <div>
        <img src="president_signature.png"><br>
        <b></b>
      </div>

      <div>
        <img src="seal.png" style="width:90px"><br>
        
      </div>

      <div>
        <img src="secretary_signature.png"><br>
        <b></b>
      </div>
    </div>

    <div class="qr-box">
    <br><br>
      <p>QR ভেরিফিকেশন</p>
      <canvas id="qr"></canvas>
    </div>
<br><br><br>
    <div class="footer ">
      Website  Credit: <span class="toufik-name"></span>   <img src="ts-logo.png" style="width:50px;height:60px;border-radias:50px">
    </div>
  `;

  // QR code: link to verify.html
  new QRious({
    element: document.getElementById("qr"),
    value: `https://test-admin-ts.github.io/khansama.association.result/verify.html?roll=${student.roll}`,
    size: 120
  });

  box.classList.remove("d-none");
  printBtn.classList.remove("d-none");
}
