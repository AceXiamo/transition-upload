import Dialog from '../Dialog'

const show = (src: string) => {
  Dialog.init({
    title: '预览',
    width: 800,
    content: () => (
      <>
        <div class="flex justify-center px-[20px]">
          <img src={src} class="max-h-[700px] w-full object-cover" />
        </div>
      </>
    ),
  })
}

export default { show }
