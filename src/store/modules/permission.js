import { asyncRouterMap, constantRouterMap } from '@/router'

function test(role) {
  const result = this.meta.roles.indexOf(role) >= 0
  console.log(result)
  return result
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * 如无配置，则默认用户有权限
 */
function hasPermission(roles, route) {
  console.log('In function hasPermission: ' + route.path)
  if (route.meta && route.meta.roles) {
    return roles.some(test, route)
  } else {
    console.log('true')
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    } else return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      console.log('GenerateRoutes')
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
