import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';
import './Menu.css';
import { useEffect, useState } from 'react';
import category from '../services/category';
import config from '../config';

interface CategoryPage {
    id: number;
    name: string;
    url: string;
    iosIcon: string;
    mdIcon: string;
}

const Menu: React.FC = () => {
    const [categories, setCategories] = useState<CategoryPage[]>([]);

    useEffect(function () {
        category.index().then(items => {
            const cats = items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    url: `/categories/${item.id}/posts`,
                    iosIcon: paperPlaneOutline,
                    mdIcon: paperPlaneSharp
                } as CategoryPage;
            });

            setCategories(cats);
        });
    }, [])

    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonItem routerLink='/' lines="none">
                        <IonListHeader>
                            {config.name}
                            <div></div>
                        </IonListHeader>
                    </IonItem>
                    <IonNote style={{
                        marginLeft: '10px'
                    }}>{config.domain}</IonNote>

                    {categories.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false} >
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.name}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                    <IonMenuToggle key={`page-contact`} autoHide={false} >
                        <IonItem routerLink="/contact" routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" ios={paperPlaneOutline} md={paperPlaneSharp} />
                            <IonLabel>Contact</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
