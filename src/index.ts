import { lazy, ComponentType, LazyExoticComponent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

class IconMap {
    map: Map<string, ComponentType<any>>;

    constructor() {
        this.map = new Map();
    }

    getIcon(
        iconName: string,
        fallbackIcon?: ComponentType<any>
    ): LazyExoticComponent<ComponentType<any>> {
        return lazy(() => {
            return new Promise((resolve, reject) => {
                const existingIcon = this.map.get(iconName);
                if (existingIcon) {
                    resolve({ default: existingIcon });
                } else if (iconName) {
                    import(
                        /* webpackMode: "lazy" */
                        /* webpackInclude: /\.js$/ */
                        /* webpackExclude: /index\.js$/ */
                        `@mui/icons-material/esm/${iconName}.js`
                    )
                        .then((Icon) => {
                            this.map.set(iconName, Icon.default);
                            resolve(Icon);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    resolve({ default: fallbackIcon ? fallbackIcon : MoreHorizIcon });
                }
            });
        });
    }
}

export default IconMap;
