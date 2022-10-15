<script setup>
defineProps(['placeholder', 'modelValue'])
const emits = defineEmits(['updateInput'])
let inputFile = $ref()
let files = $ref([])

const fileChanged = async (e) => {
  if (e.target.files.length > 0) {
    files = []
    Array.from(e.target.files)
      .slice(0, 5)
      .forEach(async (img) => {
        if (img.type.split('/')[0] === 'image') {
          let imgs = await toBase64(img)
          files.push(imgs)
        }
      })
    emits('updateInput', files)
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const moveLeft = (index) => {
  let temp = files[index - 1]
  files[index - 1] = files[index]
  files[index] = temp
}

const moveRight = (index) => {
  let temp = files[index + 1]
  files[index + 1] = files[index]
  files[index] = temp
}
</script>

<template>
  <div
    class="relative rounded-md border-2 border-dashed border-neutral-200 p-5 text-center"
    :class="files.length !== 0 ? '' : 'cursor-pointer'"
    @click="files.length === 0 && inputFile.click()"
  >
    <input
      type="file"
      ref="inputFile"
      class="hidden"
      multiple
      @change="fileChanged"
      accept="image/*"
    />
    <div v-if="files.length < 1" class="py-5">{{ placeholder }}</div>
    <div v-else>
      <div :class="`flex flex-wrap items-start justify-around gap-3`">
        <div v-for="(file, index) in files" :key="file" class="relative">
          <img :src="file" class="h-28 w-28 object-cover" />
          <div
            class="absolute left-0 bottom-0 flex w-full items-center justify-between"
          >
            <button
              class="bg-slate-200 p-1 disabled:text-slate-400"
              :disabled="index === 0 && 'disabled'"
              @click="moveLeft(index)"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
              </svg>
            </button>
            <button
              class="bg-slate-200 p-1 disabled:text-slate-400"
              @click="files.splice(index, 1)"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <button
              class="bg-slate-200 p-1 disabled:text-slate-400"
              :disabled="index === files.length - 1 && 'disabled'"
              @click="moveRight(index)"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="files.length > 1"
      class="mt-2 inline-block rounded-md bg-red-200 px-2.5 py-1 font-medium hover:bg-red-300"
      @click="files = []"
    >
      Clear All
    </button>
  </div>
</template>
