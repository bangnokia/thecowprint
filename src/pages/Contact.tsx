import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import config from "../config";

export default function Contact() {
    const email = `contact@${config.domain}`;
    const contactUrl = `https://${config.domain}/contact-us`;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Contact</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <div style={{
                    padding: '2rem'
                }}>
                    <h1>{config.name}</h1>
                    <p>You can contact us through our website or our email address:</p>
                    <ul>
                        <li>Website: <a href={contactUrl}>{contactUrl}</a></li>
                        <li>Email: <a href={`mailto:${email}`}>{email}</a></li>
                    </ul>
                </div>
            </IonContent>
        </IonPage >
    )
}