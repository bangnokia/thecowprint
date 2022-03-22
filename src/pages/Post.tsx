import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonText } from '@ionic/react';
import { useParams } from 'react-router';
import { PostType } from '../services/post';
import postService from '../services/post';

const Post: React.FC = () => {
    const [post, setPost] = useState<PostType>();
    const { id } = useParams<{ id: string; }>();

    console.log('post', post)

    useEffect(() => {
        postService.show(+id).then((result: PostType) => setPost(result));
    }, [id])

    if (!post) {
        return <IonPage></IonPage>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    {/* <IonTitle>{post.title}</IonTitle> */}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen style={{
                padding: '1rem'
            }}>
                <IonText color="primary">
                    <h1>{post.title}</h1>
                </IonText>
                <IonText style={{
                    display: 'flex',
                    gap: '1rem',
                }}>
                    <span>Author: {post._embedded.author.name}</span>
                    <span>Published at: {post.date.substring(0, 10)}</span>
                </IonText>
                <IonText>
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                </IonText>
                <IonText>
                    Original post: <a href={post.link}>{post.link}</a>
                </IonText>
            </IonContent>
        </IonPage >
    )
}

export default Post;