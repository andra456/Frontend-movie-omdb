import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../reduxs/store'
import { fetchAllmovie } from '../../reduxs/actions';
import './_index.scss';
import { Loader } from '../../assets/img/Images';
import  useEventListener from './useEventListener'
import ModalOverviews from './modal'
import { HiPlay } from 'react-icons/hi';
import _ from 'lodash'


function Home() {

    const content = useSelector((state: RootState) => state.content.movies)
    const dispatch = useDispatch()

    const initModal = {
        show: false,
        data: { }
    }
    const defaultReq = {
        y: "",
        s: "Batman",
        type: "",
        page: 1

    }
    const [dataList, setData] = React.useState<any | null>([]);
    const [loading, setloading] = React.useState(false)
    const isMount = React.useRef(false);
    const [reqMovie, setReqMovie] = React.useState(defaultReq);
    const [modal, setmodal] = React.useState(initModal)


    React.useEffect(() => {
        isMount.current = true
        if (isMount.current) {
            setReqMovie({ ...reqMovie })
        }
    }, [])

    React.useEffect(() => {
        dispatch(fetchAllmovie(reqMovie))
    }, [reqMovie])

    React.useEffect(() => {
        setTimeout(() => {
            if (isMount.current) {
                nextPage()}
        }, 2000);
    }, [loading])

    React.useEffect(() => {

        if (isMount.current) {

            if (!_.isNil(content.all)) {
                let movie = content.all
                if (!dataList) {
                    setData(movie)
                } else {
                    setData([...dataList, ...movie])
                }

                setloading(false)
            }
        }
    }, [content.all])


    const nextPage = () => {
        console.log(content.all , dataList.length , Number(content.totalResults))
        if (content.all && dataList.length < Number(content.totalResults)) {
            
            setReqMovie({ ...reqMovie, page: reqMovie.page + 1 })
        }
    }
 
    const div = React.useRef<HTMLDivElement>(null)

    const onScroll = (event: Event) => {

        let st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            if ((st + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                setloading(true)
            }
    }


    useEventListener('scroll', onScroll)


    return (
        <Fragment>
            <div className="content-wrapper" ref={div}>

                
                    <h1 className="header">Populer <span> Movie Series</span></h1>

                    <div className="movie-list row">  {
                        dataList ? dataList.map((e: any, i: number) => (
                            <div key={i} className="grid-card col-xs-6 col-sm-4 col-md-3 col-lg-2" onClick={() => setmodal({ show: true, data: e })}>
                                <div className="movie">
                                    <div className="menu"><HiPlay /></div>
                                    <div className="movie-img" style={{ backgroundImage: `url(${e.Poster})` }}></div>
                                </div>
                            </div>
                        )) : ''} </div>


                <div className="loader-movie">
                    {loading ? <Loader /> : ''}
                </div>
                <ModalOverviews show={modal.show} data={modal.data} callback={() => setmodal(initModal)} />

            </div>

        </Fragment>
    )
}


export default Home
