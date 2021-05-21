import { Switch, Route, useRouteMatch } from "react-router-dom";
import BlogDetails from "../../components/Blogs/BlogDetails";
import BlogDisplay from "../../components/Blogs/BlogDisplay";
import BlogEdit from "../../components/Blogs/BlogEdit";

import "./Blogs.css";

const Blogs = () => {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={BlogDisplay} />
      <Route path={`${path}/view/:blogId`} component={BlogDetails} />
      <Route path={`${path}/edit/:blogId`} component={BlogEdit} />
    </Switch>
  );
};

export default Blogs;
