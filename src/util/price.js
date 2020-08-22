export const formatPrice = (price, locale = "vi-VN") =>
  `${new Intl.NumberFormat(locale).format(price)}₫`
