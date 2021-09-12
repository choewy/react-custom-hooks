# 1. package 초기화

- 프로젝트 폴더로 이동하여 의존성을 설치한다.

```
$ cd test-hook
$ npm init
package name : @test/test-hook
version : (1.0.0)
description : < description >
entry point : ( index.js )
test command : 
git repository : < git posigory URL >
keywords : <keyword, keyword, keyword ... >
ahthor: < author name >
license : (ISC) MIT

is this OK? (yes) yes
```

- 사용자가 패키지를 사용할 수 있도록 의존성을 설치한다.

```
$ npm i react react-dom
```

- 이때, 사용자의 의존성 설치 여부에 따라 의존성을 설치하도록 package.json 파일의 dependencies를 peerDependencies로 수정한다.

```
...
  "peerDependencies": {
    "react": ...,
    "react-dom": ...,
  },
...
```

---

# 2. Organization 생성

- NPM 사이트에서 Organization 생성 페이지로 이동한다.
- 이때, 이름은 위에서 입력한 패키지 이름(test)를 입력한다.
- Unlimited public package로 생성한다.

---

# 3. Package 배포

- 콘솔로 이동한 후 npm에 로그인한다.

```
$ cd test-hook
$ npm login
```

- 그리고 패키지를 배포한다.
- 이때, 접근 권한은 공개로 설정한다. 

```
$ npm publish --access public
```

