const database = {
  getItems() {
    const getItem: string|null = localStorage.getItem('companies');
    return getItem ? JSON.parse(getItem) : null;
  },
  setItemToDatabase(items: Array<object>) {
    return localStorage.setItem('companies', JSON.stringify(items));
  },
};
export default database;
