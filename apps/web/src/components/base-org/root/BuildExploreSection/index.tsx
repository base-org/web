/* eslint-disable react/self-closing-comp */
import Title from 'apps/web/src/components/base-org/typography/Title';

import CardLink from 'apps/web/src/components/base-org/CardLink';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

export default async function BuildExploreSection() {
  return (
    <section>
      <AnalyticsProvider context="build_tiles">
        <Title level={TitleLevel.Title1}>Build</Title>
        <div className="mb-12 mt-8 flex w-full flex-col gap-4 md:flex-row">
          <CardLink href="https://docs.base.org/">
            <div className="flex items-center gap-4">
              <svg
                className="h-[60px]"
                viewBox="0 0 74 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <filter id="inset-shadow">
                  <feOffset dx="0" dy="0"></feOffset>
                  <feGaussianBlur stdDeviation="6" result="offset-blur"></feGaussianBlur>
                  <feComposite
                    operator="out"
                    in="SourceGraphic"
                    in2="offset-blur"
                    result="inverse"
                  ></feComposite>
                  <feFlood floodColor="#0052FF" floodOpacity=".99" result="color"></feFlood>
                  <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>
                  <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
                </filter>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M55.1045 77.585H69.1856C71.8003 77.585 73.9199 75.4654 73.9199 72.8507V4.73432C73.9199 2.11963 71.8003 0 69.1856 0H55.1045L55.076 8.39233e-05H44.0195C44.0134 6.1042e-05 44.0074 4.95911e-05 44.0013 4.95911e-05H29.9202C27.3055 4.95911e-05 25.1859 2.11967 25.1859 4.73437V33.4579C25.1859 36.0726 27.3055 38.1922 29.9202 38.1922H44.0013C46.616 38.1922 48.7356 36.0726 48.7356 33.4579V23.5498H50.3702L50.3702 72.8507C50.3702 75.4654 52.4898 77.585 55.1045 77.585ZM4.73432 0.165855H18.8154C21.4301 0.165855 23.5497 2.28548 23.5497 4.90017V54.1627H25.1843V44.2615C25.1843 41.6468 27.304 39.5272 29.9186 39.5272H43.9997C46.6144 39.5272 48.7341 41.6468 48.7341 44.2615V72.985C48.7341 75.5997 46.6144 77.7194 43.9997 77.7194H29.9186C29.8319 77.7194 29.7458 77.717 29.6602 77.7124H19.0747C18.9889 77.7171 18.9024 77.7194 18.8154 77.7194H4.73432C2.11963 77.7194 0 75.5998 0 72.9851V4.90017C0 2.28548 2.11963 0.165855 4.73432 0.165855Z"
                  fill="#BBBBBB"
                  style={{
                    filter: `url(#inset-shadow)`,
                  }}
                ></path>
              </svg>
              <div>
                <Text className="mr-2 inline-block">Docs</Text>{' '}
                <Text className="inline-block opacity-50">
                  Get started building on Base by reading our docs.
                </Text>
              </div>
            </div>
          </CardLink>
          <CardLink href="/getstarted">
            <div className="flex items-center gap-4">
              <svg
                className="h-[60px]"
                viewBox="0 0 95 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M40.0978 0H54.59C57.2811 0 59.4626 2.18152 59.4626 4.87256V16.4509C59.4626 19.1419 57.2811 21.3234 54.59 21.3234H40.0978C37.4067 21.3234 35.2252 19.1419 35.2252 16.4509V4.87256C35.2252 2.18152 37.4067 0 40.0978 0ZM4.87255 28.5479H19.3648C22.0558 28.5479 24.2374 30.7294 24.2374 33.4204V44.9987C24.2374 47.6898 22.0558 49.8713 19.3648 49.8713H4.87255C2.18152 49.8713 0 47.6898 0 44.9987V33.4204C0 30.7294 2.18152 28.5479 4.87255 28.5479ZM35.2985 28.5479H30.9177C28.2267 28.5479 26.0452 30.7294 26.0452 33.4205V44.9988C26.0452 47.6898 28.2267 49.8713 30.9177 49.8713H35.2985V50.8914C35.2985 53.5824 37.48 55.7639 40.1711 55.7639H54.6633C57.3544 55.7639 59.5359 53.5824 59.5359 50.8914V49.8713H63.5841C66.2752 49.8713 68.4567 47.6898 68.4567 44.9988V33.4205C68.4567 30.7294 66.2752 28.5479 63.5841 28.5479H59.5359V27.5093C59.5359 24.8183 57.3544 22.6367 54.6633 22.6367H40.1711C37.48 22.6367 35.2985 24.8183 35.2985 27.5093V28.5479ZM75.0413 28.5479H89.5336C92.2246 28.5479 94.4061 30.7294 94.4061 33.4205V44.9988C94.4061 47.6898 92.2246 49.8713 89.5336 49.8713H75.0413C72.3503 49.8713 70.1688 47.6898 70.1688 44.9988V33.4205C70.1688 30.7294 72.3503 28.5479 75.0413 28.5479ZM29.0523 6.06909H14.5601C11.869 6.06909 9.6875 8.25061 9.6875 10.9416V22.52C9.6875 25.211 11.869 27.3925 14.5601 27.3925H29.0523C31.7433 27.3925 33.9249 25.211 33.9249 22.52V10.9416C33.9249 8.25061 31.7433 6.06909 29.0523 6.06909ZM65.8513 6.06898H80.3435C83.0346 6.06898 85.2161 8.2505 85.2161 10.9415V22.5198C85.2161 25.2109 83.0346 27.3924 80.3435 27.3924H65.8513C63.1603 27.3924 60.9787 25.2109 60.9787 22.5198V10.9415C60.9787 8.2505 63.1603 6.06898 65.8513 6.06898ZM40.2669 78.4727H54.7591C57.4501 78.4727 59.6317 76.2911 59.6317 73.6001V62.0218C59.6317 59.3308 57.4501 57.1493 54.7591 57.1493H40.2669C37.5758 57.1493 35.3943 59.3308 35.3943 62.0218V73.6001C35.3943 76.2911 37.5758 78.4727 40.2669 78.4727ZM80.3423 72.4034H65.85C63.159 72.4034 60.9775 70.2219 60.9775 67.5309V55.9526C60.9775 53.2615 63.159 51.08 65.85 51.08H80.3423C83.0333 51.08 85.2148 53.2615 85.2148 55.9526V67.5309C85.2148 70.2219 83.0333 72.4034 80.3423 72.4034ZM14.5585 72.4034H29.0508C31.7418 72.4034 33.9233 70.2219 33.9233 67.5309V55.9526C33.9233 53.2615 31.7418 51.08 29.0508 51.08H14.5585C11.8675 51.08 9.68597 53.2615 9.68597 55.9526V67.5309C9.68597 70.2219 11.8675 72.4034 14.5585 72.4034Z"
                  fill="#BBBBBB"
                  style={{
                    filter: `url(#inset-shadow)`,
                  }}
                ></path>
              </svg>
              <div>
                <Text className="mr-2 inline-block">Resources</Text>{' '}
                <Text className="inline-block opacity-50">
                  Resources for builders to build, fund and grow your apps.
                </Text>
              </div>
            </div>
          </CardLink>
        </div>
      </AnalyticsProvider>
      <AnalyticsProvider context="explore_tiles">
        <Title level={TitleLevel.Title1}>Explore</Title>
        <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
          <CardLink href="/ecosystem">
            <div className="flex items-center gap-4">
              <svg
                className="h-[60px]"
                viewBox="0 0 73 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <filter id="inset-shadow">
                  <feOffset dx="0" dy="0"></feOffset>
                  <feGaussianBlur stdDeviation="6" result="offset-blur"></feGaussianBlur>
                  <feComposite
                    operator="out"
                    in="SourceGraphic"
                    in2="offset-blur"
                    result="inverse"
                  ></feComposite>
                  <feFlood floodColor="#0052FF" floodOpacity=".99" result="color"></feFlood>
                  <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>
                  <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
                </filter>
                <path
                  d="M73 17.9958V5.33062C73 2.38629 70.6197 0 67.6828 0H51.8696C48.9327 0 46.5524 2.38629 46.5524 5.33062V11.506C45.9112 13.7289 43.8677 15.3537 41.4443 15.3537C41.4443 15.3537 41.4489 15.3675 41.4582 15.3891H31.7417C31.7494 15.366 31.7556 15.3537 31.7556 15.3537C28.9324 15.3537 26.6229 13.1477 26.4491 10.3606V5.33216C26.4491 2.38783 24.0689 0.00154153 21.1319 0.00154153H5.3172C2.38028 0 0 2.38629 0 5.33062V17.9958C0 20.9402 2.38028 23.3265 5.3172 23.3265H6.13984L6.13677 23.3342C9.07368 23.3342 11.454 25.7205 11.454 28.6648C11.454 28.6648 11.4617 28.6617 11.4709 28.6586V49.329C11.4601 49.326 11.454 49.3229 11.454 49.3229C11.454 52.2672 9.07368 54.6535 6.13677 54.6535L6.14445 54.672H5.3172C2.38028 54.672 0 57.0583 0 60.0026V72.6678C0 75.6122 2.38028 77.9985 5.3172 77.9985H21.1304C24.0673 77.9985 26.4476 75.6122 26.4476 72.6678V67.6548C26.6214 64.8677 28.9294 62.6618 31.754 62.6618C31.754 62.6618 31.7479 62.6433 31.7356 62.6109H41.4628C41.4505 62.6433 41.4443 62.6618 41.4443 62.6618C43.8677 62.6618 45.9112 64.2865 46.5524 66.5094V72.6694C46.5524 75.6137 48.9327 78 51.8696 78H67.6828C70.6197 78 73 75.6137 73 72.6694V60.0042C73 57.0598 70.6197 54.6735 67.6828 54.6735H66.3743L66.382 54.655C64.2185 54.655 62.3579 53.3586 61.5276 51.4995V26.4897C62.3579 24.6306 64.2185 23.3342 66.382 23.3342L66.3789 23.3265H67.6828C70.6197 23.3265 73 20.9402 73 17.9958Z"
                  fill="#BBBBBB"
                  style={{
                    filter: `url(#inset-shadow)`,
                  }}
                ></path>
              </svg>
              <div>
                <Text className="mr-2 inline-block">Apps</Text>{' '}
                <Text className="inline-block opacity-50">
                  Explore the apps in the Base ecosystem.
                </Text>
              </div>
            </div>
          </CardLink>
          <CardLink href="https://bridge.base.org/">
            <div className="flex items-center gap-4">
              <svg
                className="h-[60px]"
                viewBox="0 0 68 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.9814 0.167046L27.3561 0.167046C27.0895 0.134045 26.8191 0.116574 26.5448 0.116574L6.67966 0.116573C2.9902 0.116573 4.18589e-07 3.1215 3.74376e-07 6.82913L8.00465e-08 31.5111C3.58334e-08 35.2187 2.9902 38.2236 6.67966 38.2236L26.5448 38.2236C30.2342 38.2236 33.2244 35.2187 33.2244 31.5111L33.2244 14.0813L34.7717 14.0813L34.7717 31.3965C34.7717 35.1042 37.7619 38.1091 41.4514 38.1091L61.3165 38.1091C65.0059 38.1091 67.9961 35.1042 67.9961 31.3965L67.9961 6.7146C67.9961 3.00697 65.0059 0.00204545 61.3165 0.00204541L41.4514 0.00204517C40.9453 0.00204517 40.4527 0.0602803 39.9794 0.167046L39.9814 0.167046Z"
                  fill="#BBBBBB"
                  style={{
                    filter: `url(#inset-shadow)`,
                  }}
                ></path>
                <path
                  d="M34.7736 46.489L34.7736 63.9188L33.2264 63.9188L33.2264 46.6036C33.2264 42.8959 30.2362 39.891 26.5467 39.891L6.67966 39.891C2.9902 39.891 4.18612e-07 42.8959 3.74399e-07 46.6036L8.00465e-08 71.2874C3.58334e-08 74.9951 2.9902 78 6.67966 78L26.5448 78C27.0509 78 27.5434 77.9418 28.0167 77.835L40.642 77.835C40.9086 77.868 41.179 77.8855 41.4533 77.8855L61.3184 77.8855C65.0079 77.8855 67.9981 74.8805 67.9981 71.1729L67.9981 46.491C67.9981 42.7833 65.0079 39.7784 61.3184 39.7784L41.4533 39.7784C37.7638 39.7784 34.7736 42.7833 34.7736 46.491L34.7736 46.489Z"
                  fill="#BBBBBB"
                  style={{
                    filter: `url(#inset-shadow)`,
                  }}
                ></path>
              </svg>
              <div>
                <Text className="mr-2 inline-block">Bridge</Text>{' '}
                <Text className="inline-block opacity-50">Bring your assets to Base.</Text>
              </div>
            </div>
          </CardLink>
        </div>
      </AnalyticsProvider>
    </section>
  );
}
