'use client'

import { useEffect, useState } from 'react'
import UiGalleryStyleList from '../ui-gallery/UiGalleryStyleList'
import { GalleryStyle, GalleryStylesSearchParams } from '@services/types'
import getGalleryStyles from '../data-access-gallery/getGalleryStyles'
import useIntersect from '@libs/shared/util-hook/useIntersect'

type GalleryStyleListProps = {
  searchParams: GalleryStylesSearchParams
  initialStyles: GalleryStyle[]
  initialHasNext: boolean
}

const GalleryStyleList = ({ searchParams, initialStyles, initialHasNext }: GalleryStyleListProps) => {
  //console.log('GalleryStyleList 렌더링 → initialStyles:', initialStyles, 'initialHasNext:', initialHasNext);
  const [styles, setStyles] = useState(initialStyles)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(initialHasNext)

  const loadMoreStyles = async () => {
    const res = await getGalleryStyles({ ...searchParams, page: page + 1 });

    //console.log('loadMoreStyles 호출됨 → API 응답:', res);
    if (res.data.length === 0) {
      setHasNext(false);
      return;
    }
    setStyles((prev) => [...prev, ...res.data]);
    setPage(res.currentPage);
    setHasNext(res.currentPage < res.totalPages);
  };
  const ref = useIntersect(() => { if (hasNext) loadMoreStyles() }, { rootMargin: '0px 0px 500px' })

  useEffect(() => {
    //console.log('useEffect 초기 데이터:', initialStyles, initialHasNext);
    setStyles(initialStyles)
    setHasNext(initialHasNext)
    setPage(1)
  }, [initialStyles, initialHasNext])

  return (
    <>
      <UiGalleryStyleList styles={styles} />
      <div ref={ref} style={{ height: '1px' }} />
    </>
  )
}

export default GalleryStyleList
