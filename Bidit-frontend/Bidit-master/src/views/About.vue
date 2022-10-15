<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'عن Bidit',
    en: 'About Bidit',
  },
  paragraph1: {
    ar: 'نظام المزاد عبر الإنترنت هو عبارة عن منصة تهدف إلى خدمة مزادات المزاد لإظهار سلعهم الفريدة من أجل جذب المزايدين للانضمام إلى مسابقة لشرائها عبر الإنترنت والتغلب على القيود الجغرافية وشراء أو بيع العناصر على الإنترنت من أي مكان وفي أي وقت .',
    en: 'Bid!t is an online auction platform aimed at servicing the auctioneers to show their unique items in order to attract bidders into a competition to purchase them on the internet and overcome geographical constraints and purchase or sell items on the internet from anywhere at any time.',
  },
  paragraph2: {
    ar: 'تم تصميم النظام بحيث يحتوي على العديد من الفئات للعناصر المعروضة والتي يمكن لمقدم العطاء الاختيار من بينها: الفن والأثاث والتحف والتكنولوجيا والملابس والسيارات والحيوانات وأخيراً أشياء أخرى',
    en: 'The system designed to have many categories for the viewed items that bidder can choose from like: art, furniture, antiques, technology, clothes, cars, animals and finally others.',
  },
  subTitle: {
    ar: 'ماذا نقدم؟',
    en: 'What are we offering?',
  },
  paragraph3: {
    ar: 'يسمح للمزاد العلني بإنشاء ملفات تعريف خاصة بهم وإضافة عناصر إلى مخزونهم والتي يمكن استخدامها لاحقًا لإنشاء عطاء لفترة محددة.',
    en: 'It allows auctioneers to create their own profiles and add items to their inventory which can later be used to create a bid for a specified period.',
  },
  paragraph4: {
    ar: 'في ذلك الوقت ، يمكن لمقدمي العطاءات المزايدة على هذه العناصر حيث في نهاية تلك الفترة الزمنية يفوز أعلى مزايد بالمزايدة ويحصل على العنصر.',
    en: 'At that time, the bidders can bid on these items where at the end of that time period the highest bidder wins the bid and gets the item.',
  },
  paragraph5: {
    ar: 'توفر منصة المزاد عبر الإنترنت للمستهلكين واجهة سهلة الاستخدام مع دعم للغات متعددة مما يجعلها أفضل من الأسواق التقليدية غير المتصلة بالإنترنت..',
    en: 'The online auction platform provides consumers with an easy to use interface with support for multiple languages ​​which makes it better than traditional offline marketplaces.',
  },
  paragraph6: {
    ar: 'تحتوي المنصة أيضًا على نظام توصية يوفر لمقدمي العروض اقتراحات أفضل بناءً على موقفهم من العطاءات التي قد تهمه.',
    en: 'The platform also has a recommendation system that provides bidders with better suggestions based on their position on bids that might interest him.',
  },
  paragraph7: {
    ar: 'وأخيرًا عندما يكون محتوى غير مرغوب فيه، يمكن لمقدم العطاء تقديم تقرير يمكن للمسؤولين اتخاذ إجراء بناءً عليه.',
    en: 'Finally when it is spam, the bidder can submit a report on which officials can take action.',
  },
})
</script>

<template>
  <BaseTitle class="mx-5">{{ $t(text.title) }}</BaseTitle>

  <div class="m-5 font-semibold capitalize">
    <p>{{ $t(text.paragraph1) }}</p>
    <p class="my-5">{{ $t(text.paragraph2) }}</p>
    <p class="mb-2 text-2xl font-bold">{{ $t(text.subTitle) }}</p>
    <p class="my-5">{{ $t(text.paragraph3) }}</p>
    <p class="my-5">{{ $t(text.paragraph4) }}</p>
    <p class="my-5">{{ $t(text.paragraph5) }}</p>
    <p class="my-5">{{ $t(text.paragraph6) }}</p>
    <p class="my-5">{{ $t(text.paragraph7) }}</p>
  </div>
</template>
