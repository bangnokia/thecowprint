import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import post, { PostType } from "../services/post";
import { useState, useEffect } from 'react';

const ListPost: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const { id } = useParams<{ id?: string; }>();

    useEffect(() => {
        const payload = id ? { categories: +id } : {};
        post.list(payload).then(items => setPosts(items));
    }, [id])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle></IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {posts.map((post) => {
                    return (
                        <IonCard key={post.id} routerLink={post.url}>
                            {post.featured_image &&
                                <IonImg src={post.featured_image} style={{
                                    maxHeight: '200px',
                                    object: 'cover',
                                    overflow: 'hidden',
                                }} />
                            }
                            <IonCardHeader>
                                <IonCardTitle dangerouslySetInnerHTML={{
                                    __html: post.title
                                }}></IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
                            </IonCardContent>
                        </IonCard>
                    )
                })}
            </IonContent>
        </IonPage>
    );
};

export default ListPost;
