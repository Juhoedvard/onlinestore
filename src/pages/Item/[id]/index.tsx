
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import  Image  from "next/image";
import Link from "next/link";
import { Loading } from "~/components/LoadingProfile";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import noImage from "../../../../public/noImage.jpg"
import Modal from 'react-modal';
import { useState } from "react";

export default function ItemDetails () {

    const ctx = api.useContext()
    const router = useRouter()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {data: user} = useSession()
    const {data: cart} = api.cart.getCart.useQuery()
    const {data: Item, isLoading} = api.item.getOne.useQuery({
        id: router.query.id as string
    },
    {
        enabled: !!router.query.id,
    })
    const {mutate, isLoading: isMutating} = api.cart.addToCart.useMutation({
        onSuccess: () => {
            void ctx.cart.getCart.invalidate()
            toast('Item added to cart')
        }
    })
    const {mutateAsync, isLoading: isRemoving} = api.item.deletePost.useMutation({
        onSuccess: () => {
            void ctx.item.getAll.invalidate()
            toast('Item removed from cart')
            router.push("/").catch(console.error);
        }
    })

    const add =(id: string) => {

        if(cart?.userID === Item?.userID){
            toast.info('You can not add your own item to cart')
            return;
        }
        else if(cart?.id === Item?.cartId){
            toast.info('Item already in cart')
            return;
        }
        else if(!user){
            toast.info('You must be logged in to add items to cart')
            return;
        }
        mutate({
            id: id,
        })

    }
    const RemoveItem = async (id : string) => {

        await mutateAsync({
            id: id,
        })


    }
    if( isLoading || isRemoving) return (<Loading/>)
    if(Item == null) return( <div>Something went wrong</div>)

    return (
        <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-b items-center  text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0  left-0 py-3 ">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to results
                </Link>
            </nav>
            <br></br>
            <>
           <div className="place-self-auto w-2/3 ">
                <h1 className="text-6xl m-4 border-b p-2 text-center place-self-start ">{Item.product}</h1>
            </div>
            <div className="flex w-full h-full justify-center items-stretch gap-3">
          {Item.image ?
                      <Image
                          loader={() => Item.image || ''}
                          src={Item.image}
                          width={300}
                          height={300}
                          alt=""
                      /> :
                      <Image
                          src={noImage}
                          width={300}
                          height={300}
                          alt=""/>}
                <div className="flex flex-col w-1/4">
                        <div className="h-2/3 items-center bg-[#434f55] rounded-xl display: block ">
                            <h2 className="p-4 ">Description: </h2>
                            <div className="p-4 whitespace-normal display: block ">{Item.description}</div>
                        </div>
                        <div className="flex flex-col">
                            <p className="  text-4xl text-center p-4">{Item.price} $</p>
                            <button className="btn btn-accent " onClick={() => add(Item.id)} disabled={isMutating} >Add to cart</button>
                        </div>
                </div>
            </div>
            {Item.userID === user?.user.id &&
            <div className="flex justify-end items-end w-1/2 gap-2 px-16">
                <button className="btn btn-danger w-40" onClick={() => setModalIsOpen(true) }>Remove post</button>
                <Modal
                    isOpen={modalIsOpen}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                    className="flex w-full h-full items-center justify-center backdrop-blur-sm ">
                        <div className="flex flex-col w-1/4 h-1/4 items-center justify-center bg-[#55656d] text-white rounded-2xl gap-4">
                            <h1 className="text-2xl">Are you sure you want to remove: </h1>
                            <span className="text-2xl"> {Item.product}</span>
                            <div className="flex gap-3 ">
                                <button  onClick={() => setModalIsOpen(false)}className="btn btn-neutral w-40 text-white">No</button>
                                <button  onClick={() => { RemoveItem(Item.id).catch(console.error),  setModalIsOpen(false)}}className="btn btn-neutral w-40 text-white">Yes</button>
                            </div>
                        </div>

                </Modal>
                <Link href={`/Item/${Item.id}/edit`}className="btn btn-neutral w-40">Edit post</Link>

            </div>} </>
            <br></br>
        </main>
    )
}




