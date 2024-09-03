function Header({ isLoggedIn, toggleLogin }) {
  return (
    <header>
      <button onClick={toggleLogin}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </header>
  );
}

export default Header;
