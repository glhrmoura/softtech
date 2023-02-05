<template>
  <div class="footer">
    <div class="footer__conatainer container">
      <div class="footer__column">
        <h2 class="footer__column-title">
          SoftTech
        </h2>
        <nav class="footer__column-group">
          <ul class="footer__column-items">
            <li class="footer__column-item">
              <a
                href="#"
                rel="noopener noreferrer"
              >
                Who we are
              </a>
            </li>
            <li class="footer__column-item">
              <a
                href="#"
                rel="noopener noreferrer"
              >
                Careers
              </a>
            </li>
            <li class="footer__column-item">
              <a
                href="#"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer__column">
        <h2 class="footer__column-title">
          Contact Us
        </h2>
        <div class="footer__column-group">
          <h3 class="footer__column-subtitle">
            General Support
          </h3>
          <ul class="footer__column-items">
            <li class="footer__column-item">
              <a href="tel:+5508000501000">
                (123) 456-7890
              </a>
            </li>
            <li class="footer__column-item">
              (From Monday to Friday, from 8AM to 6PM)
            </li>
          </ul>
        </div>
        <div class="footer__column-group">
          <h3 class="footer__column-subtitle">
            <span>WhatsApp</span>
          </h3>
          <ul class="footer__column-items">
            <li class="footer__column-item">
              <a
                rel="noopener noreferrer"
                href="http://wa.me/1234567890"
              >
                (123) 456-7890
              </a>
            </li>
            <li class="footer__column-item">
              <a href="mailto:support@softtech.com">
                support@softtech.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom-bar">
        <div class="footer-bottom-bar__social-container">
          <a
            class="footer-bottom-bar__social-item"
            title="Ir para nosso Facebook"
            rel="noopener noreferrer"
            href="#"
          >
            <img
              alt="Facebook"
              :src="require('@/assets/icons/facebook.svg')"
            />
          </a>
          <a
            href="#"
            class="footer-bottom-bar__social-item"
            rel="noopener noreferrer"
          >
            <img
              alt="LinkedIn"
              :src="require('@/assets/icons/linkedin.svg')"
            />
          </a>
          <a
            href="#"
            class="footer-bottom-bar__social-item"
            rel="noopener noreferrer"
          >
            <img
              alt="Twitter"
              :src="require('@/assets/icons/twitter.svg')"
            />
          </a>
          <a
            href="#"
            class="footer-bottom-bar__social-item"
            rel="noopener noreferrer"
          >
            <img
              alt="WhatsApp"
              :src="require('@/assets/icons/whatsapp.svg')"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 24px;
  font-size: 14px;
  border-top: 1px solid $primaryBorderColor;
}

.footer__conatainer {
  display: flex;
}

.footer-bottom-bar {
  display: flex;
}

.footer-bottom-bar__social-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.footer-bottom-bar__social-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: $primaryIconColor;
  border-radius: 50%;

  img {
    height: 15px;
    width: 15px;
  }
}

.footer__column {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 24px;

  &:not(:last-child) {
    border-right: 1px solid $primaryBorderColor;;
  }
}

.footer__column-group:not(:last-child) {
  margin-bottom: 24px;
}

.footer__column-title {
  font-weight: 800;
  font-size: 20px;
  margin: 0px;
  margin-bottom: 18px;
}

.footer__column-subtitle {
  font-weight: 600;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 12px;
}

.footer__column-items {
  padding: 0px;
  margin: 0px;
  list-style: none;
}

.footer__column-item {
  margin: 0px;
  margin-bottom: 12px;
}
</style>
