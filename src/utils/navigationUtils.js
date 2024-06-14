
import navBarItems from "../static/navBarItems.json";

const getMenuItems = (currentPath, navigate) => {
    /**
     * Nested function that formats the list of menu items.
     * @param {Array<{label:string, path:string}>} menuItems
     * @returns {Array<{label: string, path:string, handler:function}>}
     */
	return navBarItems.map(item => {
		return  {
			...item,
			handler: () => currentPath !== item.path && navigate(item.path),
		}
	})
};

export {
	getMenuItems
}