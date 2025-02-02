<script setup lang="ts">
import { isVNode } from 'vue'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'
import { useToast } from './use-toast'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <div class="w-fit flex space-x-5 items-center">
          <NuxtImg
            v-if="toast.image"
            :src="toast.image"
            width="50"
            height="50"
            class="rounded-md w-fit h-fit"
          ></NuxtImg>
          <div class="flex flex-col space-y-0.5">
            <ToastTitle v-if="toast.title" class="text-base">
              {{ toast.title }}
            </ToastTitle>
            <template v-if="toast.description">
              <ToastDescription v-if="isVNode(toast.description)">
                <component :is="toast.description" />
              </ToastDescription>
              <ToastDescription v-else>
                {{ toast.description }}
              </ToastDescription>
            </template>
          </div>
        </div>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
