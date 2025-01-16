<template>
  <div class="typeit-wrap">
    <p class="typeit-content">
      <span
        id="typeit-text"
        ref="contentRef"
        :class="{ 'cursor-hidden': !showCursor || isFinished }"
        >{{ displayText }}</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  defineOptions({
    name: 'Typer'
  });

  interface Props {
    text?: string;
    speed?: number;
    showCursor?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '这是打字机预览效果，请传入 text 以替换默认文本。',
    speed: 80,
    showCursor: true
  });

  const emit = defineEmits<{
    (e: 'finished'): void;
    (e: 'typing', progress: number): void;
  }>();

  const displayText = ref('');
  const contentRef = ref<HTMLDivElement | null>(null);
  const isFinished = ref(false);
  let index = 0;
  let timer: any = null;

  const addNextCharacter = () => {
    if (index < props.text.length) {
      displayText.value += props.text[index];
      index++;
      emit('typing', (index / props.text.length) * 100);
      timer = setTimeout(addNextCharacter, props.speed);
    } else {
      isFinished.value = true;
      emit('finished');
    }
  };

  // 重置函数
  const reset = () => {
    if (timer) {
      clearTimeout(timer);
    }
    displayText.value = '';
    index = 0;
    isFinished.value = false;
    addNextCharacter();
  };

  defineExpose({
    reset
  });

  onMounted(() => {
    addNextCharacter();
  });
</script>

<style scoped>
  @property --pointer-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #000;
  }

  .typeit-wrap {
    position: relative;
    display: inline;
  }
  .typeit-content {
    display: inline-block;
  }
  #typeit-text {
    background: linear-gradient(
      90deg,
      transparent,
      transparent calc(100% - 2px),
      var(--pointer-color) calc(100% - 2px),
      var(--pointer-color)
    );
    background-repeat: no-repeat;
    background-position: 0 5px;
    background-size: 100% 70%;
    animation: color-change 0.8s linear infinite;
  }
  #typeit-text .cursor-hidden {
    background: none;
    animation: none;
  }

  @keyframes color-change {
    0%,
    40% {
      --pointer-color: #000;
    }

    60%,
    100% {
      --pointer-color: transparent;
    }
  }
</style>
