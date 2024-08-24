# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# React Router
## Key Points to remember:-

Create a layout.jsx file to tell how the layout will look like. It will use the Outlet component where you want the other components to appear.

```javascript
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
```

### Use of <Link> and <NavLink>

- We use the <Link to='${yourpath}'> tag instead of html <a> tag because the <a> tag reloads the whole page which violets the usage of react.

- We use the <NavLink to='${yourpath}'> as it provides various property such as isActive which is used to check if the link is currently active or not.

```javascript
<Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/"
                        >
```

```javascript
<NavLink to="/"
                                // isActive is used to check if the link is active or not
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
```
In the main file use RouterProvider instead of App component and pass the router prop to it

```javascript
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

Create the route by using the createBrowserRouter() method as follows:-

### One way to create route

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
```

### Alternate way

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      <Route loader={githubInfoLoader} path="github" element={<Github />} />
    </Route>
  )
);
```

The loader attribute in the above is used for various purposes like api call, db connection call, etc. It will load the data in the cache even before the useEffect hook.

```javascript
import { useLoaderData } from 'react-router-dom'
function  Github() {
    const data = useLoaderData();
    // Befoer using Loader
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/monishgiri')
    //     .then((res) => res.json())
    //     .then((data) => setData(data));
    // },[])
  return (
    <div className='text-center m-4 bg-gray-500 text-white text-3xl'>Github Followers: {data.followers}
        <img className='text-center' src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default  Github

export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/monishgiri');
    return response.json();
}
```

The useLoaderData() hook is used to get the data from the Loader

- utilize the useParam() hook to get the data from the path or url

```javascript
import { useParams } from "react-router-dom";
function User() {
  const { userid } = useParams();
  return (
    <div className="bg-gray-600 text-white text-3xl p-4">User: {userid}</div>
  );
}

export default User;
```
- 