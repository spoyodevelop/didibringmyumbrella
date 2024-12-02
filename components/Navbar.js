import React from "react";

const sections = [
  "만든이유",
  "날씨보기",
  "어느때우산",
  "인포그래피",
  // Add other sections here
];
const scrollToTopWithOffset = (id) => {
  const headerHeight = 100; // 헤더의 높이
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }
};
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>만든이유</a>
              <ul className="p-2">
                <li>
                  <a onClick={() => scrollToTopWithOffset("만든이유")}>
                    만든이유
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("작동원리")}>
                    작동원리
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("한번쯤은")}>
                    한번 쯤 있으시죠?
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("사용방법")}>
                    사용방법
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a>어느때우산</a>
              <ul className="p-2">
                <li>
                  <a onClick={() => scrollToTopWithOffset("어느때우산")}>
                    어느때우산
                  </a>
                </li>

                <li>
                  <a onClick={() => scrollToTopWithOffset("갑자기비")}>
                    앗 갑자기 비가!
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a onClick={() => scrollToTopWithOffset("인포그래피")}>
                인포그래피
              </a>
            </li>
          </ul>
        </div>
        <a className="text-xl btn btn-ghost" onClick={() => scrollToTop()}>
          아 맞다 우산
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-4 px-1 menu menu-horizontal">
          <li className="mr-2">
            <details>
              <summary>만든이유</summary>
              <ul className="p-2">
                <li>
                  <a onClick={() => scrollToTopWithOffset("만든이유")}>
                    만든이유
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("작동원리")}>
                    작동원리
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("한번쯤은")}>
                    한번쯤은
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToTopWithOffset("사용방법")}>
                    사용방법
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a onClick={() => scrollToTopWithOffset("날씨보기")}> 날씨보기</a>
          </li>
          <li>
            <details>
              <summary>어느때우산</summary>
              <ul className="p-1">
                <li>
                  <a onClick={() => scrollToTopWithOffset("어느때우산")}>
                    어느때?
                  </a>
                </li>

                <li>
                  <a onClick={() => scrollToTopWithOffset("갑자기비")}>
                    갑자기비
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a onClick={() => scrollToTopWithOffset("인포그래피")}>
              인포그래피
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a onClick={() => scrollToTopWithOffset("QnA")} className="btn">
          Q&A
        </a>
      </div>
    </div>
  );
};

export default Navbar;
