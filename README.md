# Donga CMS Frontend

* 동아출판 CMS 프로젝트입니다.



<br /><hr /><br />



## style

* `tailwindcss` 를 사용합니다.
* `shadcn-ui` 의 의존성 패키지이므로, `styled-components`를 별도로 사용하지 않고, `tailwindcss`를 그대로 사용합니다.
* `nested` 문법을 사용할 수 있습니다.
* `stylesheet(.css)` 파일은 컴포넌트명과 일치시킵니다.



<br /><hr /><br />



## Layout

* 경로: `src/layouts/`
* Layout의 특정 부분을 개별 컴포넌트로 구현하였으며, 개별 컴포넌트를 조합하여 하나의 Layout 컴포넌트가 됩니다.

### AuthLayout

* 로그인, 비밀번호 찾기 페이지의 Layout 입니다.

```tsx
<AuthLayout>
  <Outlet />
</AuthLayout>
```


<br /><br />


### AuthedLayout

* 로그인 성공 후 CMS 관련 페이지의 Layout 입니다.

```tsx
<AuthedHeaderLayout>
  <AuthedSidebarLayout>
    <Outlet />
  </AuthedSidebarLayout>
</AuthedHeaderLayout>
```
