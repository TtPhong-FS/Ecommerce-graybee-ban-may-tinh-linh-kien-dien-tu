import { Breadcrumbs } from '@mui/material'

import { Link, useLocation, useMatches } from 'react-router-dom'
export const BreadCrumbs = () => {
  const matches = useMatches()
  const location = useLocation()

  const hiddenPaths = ['/', '/home', '/login', '/signup']

  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => ({
      label: match.handle.crumb(match),
      path: match.pathname
    }))

  return (
    <Breadcrumbs className="select-none" aria-label="breadcrumb" py={2}>
      {crumbs.map((item, index) => {
        const lastItem = index === crumbs.length - 1
        return lastItem ? (
          <label key={index} className=" text-muted-foreground text-sm">
            {item.label}
          </label>
        ) : (
          <Link className="text-secondary  text-sm hover:underline decoration-solid " to={item.path} key={index}>
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
