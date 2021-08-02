import axios from "axios";
import Swal from "sweetalert2";
// Google URL 주소에서 code 뽑아주는 함수
export const codeExtractor = (URL) => {
  const regex = /code=[0-9%A-Za-z_-]*/g;
  const code = URL.match(regex);
  const STR_CODE = code.join();
  const trimmedCode = STR_CODE.substring(5);
  return trimmedCode;
};

export const testalert = () => {
  Swal.fire({
    title: "Error!",
    text: "닉네임이 없어요!",
    icon: "error",
    confirmButtonText: "Test",
  });
};

// TODO: nicknameCheck 순수성 확보
// 지금 닉네임 중복체크, 닉네임 설정 2가지 기능을 동시에 하는데, 이걸 분리해야함
export const nicknameCheck = (email) => {
  Swal.fire({
    title: "만나서 반가워요!",
    input: "text",
    inputLabel: "당신만의 멋진 닉네임을 알려주세요",
    inputValidator: async (nickname) => {
      if (!nickname) {
        return "우리 사이트 그렇게 허졉하지는 않아요";
      } else {
        const nicknameCheckURL = `http://127.0.0.1:9000/curation/user/userNicknameCheck?nickname=${nickname}`;
        const isExist = await axios.get(nicknameCheckURL);
        if (isExist.data) {
          return "이미 존재하는 닉네임입니다.";
        } else {
          const nicknameSetURL =
            "http://127.0.0.1:9000/curation/user/setNickname";
          const data = { nickname: nickname, email: email };
          const config = { withCredentials: true };
          await axios.post(nicknameSetURL, data, config).then(
            Swal.fire({
              title: "멋진 닉네임이네요!",
              text: "같이 즐거운 시간 보내자고요 :)",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                window.location.href = "/";
              },
            })
          );
        }
      }
    },
  });
};