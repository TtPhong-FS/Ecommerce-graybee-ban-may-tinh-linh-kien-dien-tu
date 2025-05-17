import { Link, useLocation, useMatches } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'

export const BreadCrumbs = () => {
  const matches = useMatches()
  const location = useLocation()

  const hiddenPaths = ['/', '/home']

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
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1
          return isLast ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem>
                <Link to={item.path}>{item.label}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
