import { Link } from "react-router-dom";

function BlogCard(props) {
  // --- Date Formatting: แปลงวันที่จาก API ให้อยู่ในรูปแบบอ่านง่าย ---
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(props.date));

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
            className="mr-2 h-8 w-8 rounded-full"
            src="https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/615568604_746001051885433_2812348847833214854_n.jpg?stp=dst-jpg_tt6&cstp=mx621x634&ctp=s621x634&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=2nIuzhtDeQgQ7kNvwFgxMqi&_nc_oc=AdrKxgZ3svySexPTS19OauTkqlrMpoEoAvN_uZQkgWH7JvZjhJIjB9O4WBn1onH2FbQ&_nc_zt=23&_nc_ht=scontent.fbkk28-1.fna&_nc_gid=7Hdx0QwQcz6ng52YQl89lA&_nc_ss=7b2a8&oh=00_Af_pjVaPi1KSXn0ZHI51aG0SZCNzsaHZnzvoBrXrcaU6ZA&oe=6A484382"
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
