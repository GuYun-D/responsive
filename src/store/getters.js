export default {
  category: (state) => state.category.categorys,
  theme: state => state.theme.themeType,
  currentCategory: state => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    return getters.category.findIndex(item => {
      return item.id === getters.currentCategory.id
    })
  },
  historys: state => state.search.historys,
  searchText: state => state.app.searchText
}