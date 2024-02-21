import { useAuthenticator } from "@aws-amplify/ui-react";

import { Container, Box, Grid } from "@mui/material";
import Header from "../components/Header";

export default function Home() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <Container>
      <Header user={user} signOut={signOut} />
      <Box display="flex" alignItems="center" style={{ height: "80vh" }}>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
          style={{ textAlign: "center" }}
        >
          <Grid item style={{ width: "100%", maxWidth: 500 }}>
            <h1>Keyreer Home</h1>
          </Grid>
          <Grid
            item
            style={{
              width: "100%",
              maxWidth: 500,
              marginTop: "10px",
            }}
          >
            <p>hello welcome to keyreer service!</p>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Header = ({ isLoggedIn, onLogout }) => {
//   return (
//     <div>
//       {isLoggedIn ? (
//         <button onClick={onLogout}>키워드 수정</button>
//       ) : (
//         <button onClick={() => window.location.href = '/login'}>로그인 하고 키워드로 알림 받기</button>
//       )}
//     </div>
//   );
// };

// const PostRow = ({ post }) => {
//   return (
//     <tr>
//       <td>{post.platform}</td>
//       <td>{post.company}</td>
//       <td>{post.title}</td>
//       <td>{post.inserted_at}</td>
//       <td><a href={post.url} target="_blank" rel="noopener noreferrer">보기</a></td>
//     </tr>
//   );
// };

// const PostTable = ({ posts }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>플랫폼</th>
//           <th>회사명</th>
//           <th>공고 제목</th>
//           <th>등록 날짜</th>
//           <th>링크</th>
//         </tr>
//       </thead>
//       <tbody>
//         {posts.map((post, index) => (
//           <PostRow key={index} post={post} />
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const Pagination = ({ currentPage, setPage }) => {
//   return (
//     <div>
//       {[...Array(5)].map((_, i) => (
//         <button key={i} onClick={() => setPage(i + 1)} disabled={currentPage === i + 1}>
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchPosts = async (page) => {
//     try {
//       const response = await axios.get(`https://api.keyreer.com/posts?page=${page}`);
//       setPosts(response.data); // 가정: 응답 데이터가 배열 형태
//     } catch (error) {
//       console.error('공고를 불러오는 데 실패했습니다.', error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(currentPage);
//   }, [currentPage]);

//   const handleLogout = () => {
//     // 토큰 삭제 및 로그아웃 처리
//     setLoggedIn(false);
//   };

//   useEffect(() => {
//     // 토큰 체크 및 상태 업데이트
//     const token = localStorage.getItem('jwt');
//     setLoggedIn(!!token);
//   }, []);

//   return (
//     <div>
//       <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//       <PostTable posts={posts} />
//       <Pagination currentPage={currentPage} setPage={setCurrentPage} />
//     </div>
//   );
// };

// export default App;
