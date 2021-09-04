import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import About from './components/About'
import Auth from './components/Auth'
import Blog from './components/Blog/'
import BlogCreate from './components/BlogCreate'
import BlogsPage from './components/BlogsPage'
import FiveHundred from './components/errorPages/FiveHundred'
import FourOFour from './components/errorPages/FourOFour'
import HomePage from './components/HomePage'

export const useRoutes = (isLogin) => {
  if (isLogin) {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path= "/test/" component= {React10} /> */}
        <Route path="/create/" component={BlogCreate} />
        <Route path="/about/" component={About} />
        {/* <Route path= "/:path"  component = {BlogCreate} /> */}
        <Route path="/blogs/" exact component={BlogsPage} />
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/404" component={FourOFour} />
        <Route path="/500" component={FiveHundred} />
        <Redirect to="/blogs" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about/" component={About} />
      {/* loggin param is for dynamicle show either login page or signup */}
      {/* <ToastProvider autoDismissTimeout={6000} autoDismiss placement="top-right"> */}
      <Route path="/auth/:logging" exact>
        <Auth />
      </Route>
      {/* </ToastProvider> */}

      <Route path="/blogs/" exact component={BlogsPage} />
      <Route path="/blogs/:id" component={Blog} />
      <Route path="/404" component={FourOFour} />
      <Route path="/500" component={FiveHundred} />
      <Redirect to="/blogs" />
    </Switch>
  )
}
