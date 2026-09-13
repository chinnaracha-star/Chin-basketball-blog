import { Link } from "react-router-dom";

function BlogCard(props) {
  // --- Date Formatting: แปลงวันที่จาก API ให้อยู่ในรูปแบบอ่านง่าย ---
  const parsedDate = props.date ? new Date(props.date) : null;
  const formattedDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(parsedDate)
      : "";

  return (
    <div className="flex flex-col gap-4">
      {/* รูปภาพทำหน้าที่เป็นลิงก์ไปยังหน้า View Post */}
      <Link
        to={`/post/${props.id}`}
        className="relative h-[212px] sm:h-[360px]"
      >
        <img
          className="h-full w-full rounded-md object-cover"
          src={props.image}
          alt={props.title}
        />
      </Link>

      {/* --- รายละเอียดบทความ: หมวดหมู่ ชื่อ คำอธิบาย และผู้เขียน --- */}
      <div className="flex flex-col">
        <div className="flex">
          <span className="mb-2 rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
            {props.category}
          </span>
        </div>

        <Link to={`/post/${props.id}`}>
          <h2 className="mb-2 line-clamp-2 text-start text-xl font-bold hover:underline">
            {props.title}
          </h2>
        </Link>

        <p className="mb-4 line-clamp-3 flex-grow text-sm text-[#6f6860]">
          {props.description}
        </p>

        <div className="flex items-center text-sm text-[#302c29]">
          <img
            className="mr-2 h-8 w-8 rounded-full object-cover"
            src="/author-avatar.png"
            alt={props.author}
          />
          <span>{props.author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <time dateTime={props.date}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
