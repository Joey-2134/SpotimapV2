export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <div className="mask mask-circle w-24">
        <img src={src}  alt="avatar"/>
      </div>
    </div>
  );
}