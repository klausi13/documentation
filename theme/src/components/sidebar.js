import {BorderBox, Flex, Position} from '@primer/components'
import React from 'react'
import navItems from '../nav.yml'
import {HEADER_HEIGHT} from './header'
import NavItems from './nav-items'
import { activateArrowKeyNavigation } from '../utils/accessibility'

function Sidebar({location, editOnGitHub}) {
  const sidebarRef = React.createRef()

  React.useEffect(() => {
    const arrowKeyNavigation = activateArrowKeyNavigation(sidebarRef.current, 'div > a')
    setFocusOnActiveItem(arrowKeyNavigation.targets)
    return arrowKeyNavigation.deactivate
  }, [location])

  function setFocusOnActiveItem(menuItems) {
    const prepareHref = (str) => str.replace(/\/$/, '')
    const activeMenuItem = menuItems.find(element => prepareHref(element.href) === prepareHref(location.href))
    if (!activeMenuItem) {
      return
    }
    activeMenuItem.focus()
  }

  return (
    <Position
      position="sticky"
      top={HEADER_HEIGHT}
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      minWidth={260}
      color="gray.8"
      bg="gray.0"
      ref={sidebarRef}
    >
      <BorderBox
        borderWidth={0}
        borderRightWidth={1}
        borderRadius={0}
        height="100%"
        style={{overflow: 'auto'}}
      >
        <Flex flexDirection="column">
          <NavItems location={location} items={navItems} editOnGitHub={editOnGitHub}/>
        </Flex>
      </BorderBox>
    </Position>
  )
}

export default Sidebar
