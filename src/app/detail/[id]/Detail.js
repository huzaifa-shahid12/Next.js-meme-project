"use client";

import { useState } from "react";
import Image from "next/image";

export default function Detail(response) {
  const [text, setText] = useState(null);
  const [text1, setText1] = useState(null);
  const [gen, setgen] = useState(null);

  console.log("detail", response);
  if (!response) {
    return <div>No meme found.</div>;
  }

  const generateMeme = async () => {
    if (!response || !text || !text1) {
      console.error("Meme ID and text fields are required");
      return;
    }

    const username = "huzaifa_shahid"; // Replace with your Imgflip username
    const password = "huzaifa1122"; // Replace with your Imgflip password

    const url = `https://api.imgflip.com/caption_image?template_id=${response.response[0].id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate meme");
      }

      const data = await response.json();
      console.log("Generated meme:", data);
      setgen(data);
      // You can update state or perform any other actions based on the response data
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div>
      {!gen ? (
        <div className="main-div h-[100vh] flex justify-center items-center bg-[black]">
          <div className="img">
            <Image
              // src={response.response[0].url}
              src={response.response[0].url}
              width={100}
              height={100}
              alt="Meme"
              className=" w-[400px] object-contain mt-2"
              priority
            />
          </div>
          <div className="mt-8 ml-[80px] p-[50px] bg-[yellow]">
            <input
              placeholder="input1"
              onChange={(e) => setText(e.target.value)}
              className="text-[18px] p-[10px]"
            />{" "}
            <br />
            <input
              placeholder="input2"
              className="mt-[10px] text-[18px] p-[10px]"
              onChange={(e) => setText1(e.target.value)}
            />
            <br />
            <button
              style={{
                backgroundColor: "red",
                // borderRadius: "10px",
                color: "white",
                fontSize: "large",
              }}
              className="p-[10px] px-[20px] mt-[10px]"
              onClick={() => generateMeme()}
            >
              Generate
            </button>
          </div>
        </div>
      ) : (
        // w-[400px]
        <div className="bg-[black] h-[100vh] flex items-center justify-center">
          <Image
            src={gen.data.url}
            width={550}
            height={550}
            priority
            className=" rounded object-contain "
          />
        </div>
      )}
    </div>
  );
}

// export default function Detail(props) {
//   const { response } = props;
//   console.log(response);
//   return (
//     <div>
//       <h2>Detail</h2>
//       {response.url.map((item) => {
//         return <img src={item} />;
//       })}
//     </div>
//   );
// }
