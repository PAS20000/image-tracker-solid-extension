import Button from './button'
import css from '../styles/panel.module.css'
import { FaSolidAngleLeft, FaSolidAngleRight, FaSolidCartShopping, FaSolidGear, FaSolidImages, FaSolidLeftLong, FaSolidRightLeft, FaSolidRightLong, FaSolidSpinner, FaSolidTrash, FaSolidUser } from 'solid-icons/fa'
import { TbRefresh } from 'solid-icons/tb'
import { FiSearch } from 'solid-icons/fi'
import { TbStairsUp } from 'solid-icons/tb'
import OpenWindowPopup from '../../utils/open-window-popup'
import { createSignal, For } from 'solid-js'
import { RiDocumentFolderZipFill } from 'solid-icons/ri'
import Modal from './modal'
import Title from './title'
import Input from './input'
import CreateImages from '../hooks/create-images'
import Progress from './progress'
import createZip from '../hooks/create-zip'
import createPagination from '../hooks/create-pagination'
import MakeImageModule from '../builders/make-image-module'
import { setImages } from '../../presentation/extension/background'

const Panel = () => {
    const [isOpen, setIsOpen] = createSignal(false)
    const { getImages } = new CreateImages()
    const { download, isFallBack } = createZip()
    const { next, previous, page, getPages, getPage, getScroll } = createPagination()
    const host = 'https://imagetracker.org'
    let carousel : HTMLDivElement | undefined

    return (
        <div class={css['container']}>
            {getImages().values[0] && 
                <div class={css['panel-down']}>
                  <div class={css['container-pages']}>
                      <Button onClick={previous}>
                          <FaSolidAngleLeft />
                      </Button>
                      <div class={css['carousel']} ref={carousel}>
                          <For each={getPages().index}>
                              {(pg) => 
                                  <Button class={page() === pg ? 'selected' : 'button-carousel'} onClick={() => {getPage(pg), getScroll(carousel)}}>
                                      {pg}
                                  </Button>
                              }   
                          </For>
                      </div>
                      <Button onClick={next}>
                          <FaSolidAngleRight />
                      </Button>
                      <h4>
                          ...{getPages().string}
                      </h4>
                  </div>
                  <h3 class={css['images-length']}>
                      <FaSolidImages style={{ 'transform' : 'translate(0px, 2px)' }} /> 
                      &nbsp;{getImages().length.toLocaleString(navigator.language)}
                  </h3>
                </div>
            }
          
            <div class={css['panel-left']}>
                <Button onClick={() => setIsOpen(true)}>
                    <FaSolidGear />
                </Button>
                <Button onClick={() => OpenWindowPopup(`${host}/profile?token=${'token()'}`).left()}>
                    <FaSolidUser />
                </Button>
                <Button onClick={() => OpenWindowPopup(`${host}/signatures?token=${'token()'}`).left()}> 
                    <FaSolidCartShopping />
                </Button>
                <Button onClick={() => OpenWindowPopup(`${host}/goals?token=${'token()'}`).left()}>
                    <TbStairsUp />
                </Button>
                <Button onClick={() => window.location.reload()}>
                    <TbRefresh />
                </Button>
                {isOpen() && (
                    <Modal close={() => setIsOpen(false)}>
                        <div class={css['container-modal']}>
                            <div class={css['box']}>
                                <div class={css['head']}>
                                    <Title 
                                        text='Configurations'
                                        icon={<FaSolidGear />}
                                    />
                                </div>
                                <div class={css['body']}>
                                    <div class={css['field']}>
                                        <Input 
                                            label='Search by'
                                            icon={<FiSearch 
                                                style={{ 'transform' : 'translate(0px,1px)' }} 
                                            />}
                                        />
                                    </div>
                                    <div class={css['field']}>
                                        <Progress 
                                            progress={getImages().length}
                                            max={getImages().length} 
                                            count
                                            icon={ <RiDocumentFolderZipFill style={{ transform : 'translate(0px, 2px)' }} /> }
                                            title='Zip file'
                                        />
                                        <Button class='submit' disabled={isFallBack() ? true : false} onClick={async () => await download(getImages().values)}>
                                            {isFallBack() ? <FaSolidSpinner /> : 'Download'}
                                        </Button>
                                    </div>
                                    <div class={css['field']}>
                                        <Progress 
                                            progress={getImages().length} 
                                            max={getImages().length} 
                                            count
                                            icon={ <FaSolidTrash style={{ transform : 'translate(0px, 2px)' }}/> }
                                            title='Trash'
                                        />
                                        <Button class='submit'  onClick={async () => {
                                            const builder = MakeImageModule()
                                            await builder.bulkDelete(getImages().values.map(img => img.id))
                                            setImages(await builder.readAll())
                                            window.location.reload()
                                        }}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}


export default Panel