import { ImageInMessageModel } from "../models/image-in-message"
import { createRoot, createSignal } from "solid-js";
import { ImageResponse } from "../../domain/interfaces/image";
import MakeImageModule from "../../main/builders/make-image-module";
import OnMessageError from "../errors/on-message";

export const [images, setImages] = createSignal<ImageResponse[]>([])
const builder = MakeImageModule()
console.log('[ Image Tracker Install ]');

(async () => {
    createRoot(async () => {
        const images = await builder.readAll()
        setImages(images)
    })

    chrome.runtime.onInstalled.addListener(() => {
        console.log('[ Image Tracker background ]')
    })
    
    chrome.action.onClicked.addListener(async () => {
        const tabs = await chrome.tabs.query({ 
            url : chrome.runtime.getURL('/popup.html') 
        })
        const extensionIsOpen = tabs[0]
        
        if (!!extensionIsOpen) {
            chrome.notifications.create({
                message : 'There is already an extension window open, do you want to open another one?',
                title : 'Image Tracker',
                type : 'basic',
                iconUrl : '/image-tracker-logo-orichalcum-09-10-2022.png',
                buttons : [
                    {
                        title : 'Yes'
                    },
                    {
                        title : 'No'
                    }
                ],
                requireInteraction : true,
                isClickable : true,
        }, (myNotificationID) => {
                chrome.notifications.onButtonClicked.addListener(async (notifId, btnIdx) => {
                    if (notifId === myNotificationID) {
                        if (btnIdx === 0) {
                            await chrome.windows.create({
                                url : chrome.runtime.getURL('/popup.html'),
                                width: 700,
                                height: 700,
                                left : 1000,
                                top : 0,
                                type : 'popup',
                                focused : true
                            })
                        } else {}
                    }
                })
            })
        } else {
            await chrome.windows.create({
                url : chrome.runtime.getURL('/popup.html'),
                width: 700,
                height: 700,
                left : 1000,
                top : 0,
                type : 'popup',
                focused : true
            })
        }
    })

    chrome.runtime.onMessage.addListener(async (message : { image ?: ImageInMessageModel }) => {
        if (message.image) {
           try {
                const image = await builder.make({
                    alt : message.image.alt,
                    src : message.image.src,
                    host : message.image.host,
                    naturalHeight : message.image.naturalHeight,
                    naturalWidth : message.image.naturalWidth
                })
                await builder.register(image)
                const all = await builder.readAll()
                setImages(all)
           } catch (e) {
              throw new OnMessageError(`${e}`)
           }
        }
    })
})()