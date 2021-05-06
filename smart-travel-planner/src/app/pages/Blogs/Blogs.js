import { Switch, Route, useRouteMatch } from "react-router-dom";
import BlogDetails from "../../components/Blogs/BlogDetails";
import BlogDisplay from "../../components/Blogs/BlogDisplay";

import "./Blogs.css";

const Blogs = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="blogs">
      <Switch>
        <Route path={path} exact component={BlogDisplay} />
        <Route path={`${path}/:blogId`} component={BlogDetails} />
      </Switch>
    </div>
  );
};

export default Blogs;
