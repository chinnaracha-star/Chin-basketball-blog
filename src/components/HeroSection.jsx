import heroImg from "../assets/brunson.jpg";

export function HeroSection() {
  return (
    <section className="px-5 pb-12 pt-4 sm:px-8 lg:px-16 lg:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-lg bg-[#fdfcf9] px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[0.85fr_420px_0.8fr] lg:gap-10 lg:px-12">
        <div className="text-center lg:text-right">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#302c29] sm:text-5xl">
            Jalen
            <br />
            Brunson,
            <br />
            NEW YORK
            <br />
            KNICKS
          </h1>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-[#6f6860] lg:ml-auto lg:mr-0">
            Basketball stories, quick takes, and sharp opinions from around the
            league.
          </p>
        </div>

        <div className="mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-lg bg-[#ebe6dc] shadow-md">
          <img
            src={heroImg}
            alt="Jalen Brunson"
            className="h-full w-full object-cover"
          />
        </div>

        <article className="mx-auto max-w-[310px] text-center lg:mx-0 lg:text-left">
          <p className="text-xs uppercase tracking-[0.28em] text-[#9a9187]">
            -basketball
          </p>
          <h2 className="mt-3 text-lg font-bold leading-snug text-[#302c29]">
            Brunson แซงหน้าลูก้าไปแล้ว
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6f6860]">
            ถ้าถามแฟนบาสเมื่อ 3 ปีก่อนว่าใครมีแววได้แหวนก่อนระหว่าง Luka
            Doncic กับ Jalen Brunson 100% กาเลือกลูก้า
          </p>
          <p className="mt-4 text-sm leading-7 text-[#6f6860]">
            กลายเป็นผิดคาดเพราะ Brunson ได้แชมป์ก่อนในฐานะผู้นำทีมตลาดใหญ่
            เขาถูกมองข้ามมาตลอดเพราะตัวเล็ก
            การได้แชมป์ทั้งถ้วยเล็กและใหญ่ในปีเดียวกันรวมถึง Finals MVP
            สยบเสียงวิจารณ์ ถูกยกระดับเป็นพวกเกรด A ทันที
          </p>
          <p className="mt-4 text-sm leading-7 text-[#6f6860]">
            Bill Simmons นักวิเคราะห์ชื่อดังอวยว่าแซงหน้าลูก้าและคนอื่นอย่างพี่เครา,
            Steve Nash, Jason Kidd, Chris Paul ไปเรียบร้อยแล้ว
          </p>
        </article>
      </div>
    </section>
  );
}
