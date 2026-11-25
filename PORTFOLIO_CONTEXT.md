# Portfolio redesign · Kelvin Nguyen

Handoff cho các chat thiết kế và triển khai tiếp theo. Ghi nhận ngày 24/11/2026. Các quyết định về nội dung, hướng thiết kế và trạng thái triển khai nằm trong file này. Các bản phác có thể mở từ mục **Bản phác và nguồn tham chiếu**.

## Hướng cập nhật ngày 25/11/2026

Kelvin chọn **clone trọn vẹn cấu trúc và hệ chuyển động của Dennis Snellenberg** nhưng áp dụng **bảng màu Sương xanh** (`#F2F6FA`, `#22354A`, `#17334D`, `#355D85`, `#D3E6EB`, `#B7C9D8`, `#8CABC4`), triển khai theo kiến trúc **multi-page tĩnh HTML/CSS/JS + GSAP + Lenis**, và **đã chuyển lên thư mục gốc** (`/index.html`, `/work/`, `/about/`, `/contact/`, `/css/`, `/js/`, `/assets/`, `/netlify.toml`) sẵn sàng deploy Netlify. Các bản phác vòng trước được lưu an toàn trong `_archive/work-sketches/` (đã thêm vào `.gitignore`).

Bản production ở thư mục gốc đã hoàn thiện và kiểm thử trình duyệt (desktop `1440×900`, tablet `768×1024`, mobile `390×844`, 0 lỗi console/network):
- **Home** ([index.html](index.html)): Curved preloader chào 4 ngôn ngữ (`Hello` · `Xin chào` · `こんにちは` · `Willkommen`), Hero chân dung WebP (`69 KB`) + location pill kèm quả cầu xoay + marquee `Kelvin Nguyen —` đảo chiều theo hướng cuộn, Intro 2 cột + nút tròn magnetic `About me`, Selected Work xếp theo timeline có floating hover preview trượt theo con trỏ + nút tròn `View`/`Demo`, dải showcase ngang 2 hàng trượt parallax ngược chiều, và curved dark footer `#17334D` kèm live local time `GMT+7`.
- **Work** ([work/index.html](work/index.html)): Bộ lọc pill (`All`, `AI Agents`, `Data & RAG`, `Web`), nút đảo chiều **Timeline (`Newest ↓` ⇄ `Oldest ↑`)**, chuyển đổi **List View (4 cột + floating hover preview) ⇄ Grid View (2 cột card đồ họa)**, nút `GitHub Archive ↗`.
- **4 Case Studies** có khung demo AI tương tác trực tiếp + footer **Next Case**: [HealthLab Evidence Intelligence](work/healthlab/index.html) (`Oct 2026 – Present`, Draft v2 vs Linked Source + auto walkthrough), [Reliable Agent Harness](work/reliable-agent-harness/index.html) (`Sep 2026`, Approve/Reject + execution trace), [HarborMind](work/harbormind/index.html) (`Apr – May 2026`, quantile wait forecast + Captain handoff + 4 public links), [mini-llm-twin](work/mini-llm-twin/index.html) (`Dec 2025 – Apr 2026`, 4-stage RAG pipeline inspector).
- **About** ([about/index.html](about/index.html)) & **Contact** ([contact/index.html](contact/index.html)): About theo bố cục Dennis (spinning globe, chân dung WebP, khối `01/02/03`, Experience xếp theo timeline với HealthLab `Oct 2026 – Present`, Certifications đã bỏ DP-700 và bổ sung NVIDIA + Google Advanced Data Analytics + 5 chứng chỉ Coursera/DataCamp/IBM/Google, Education & Languages); Contact nền tối `#17334D` nâng cấp **Netlify Forms** (gửi AJAX + honeypot chống spam + email notification) và nút Copy email. Toàn bộ liên kết/nút CV đã được gỡ bỏ theo yêu cầu của Kelvin.
- **Tối ưu tài sản**: Bộ ảnh chân dung nén WebP (`8.4 MB → 216 KB`), bổ sung `assets/favicon.svg`, `assets/og-preview.jpg` và thẻ OpenGraph cho toàn bộ 8 trang. Tên miền dự kiến test trước: **`kelvinnguyen.is-a.dev`** (miễn phí vĩnh viễn qua `is-a-dev/register`).

Các phần tham chiếu ở site của Dennis gồm Home dùng chân dung và chữ lớn, Work có danh sách và lưới, case study dẫn tới dự án kế tiếp, About bổ sung bối cảnh cá nhân, Contact cho đường liên hệ rõ và Archive tách các dự án đã làm. Bản Sương xanh mở bằng chữ lớn và chân dung Kelvin trong một bố cục tràn khung. Demo HealthLab nằm ngay sau phần giới thiệu. Case study tách phần mở đầu và khung minh họa, với **Next project** ở dưới. **Experience** có phần giới thiệu ngắn và CV. **Contact** gom email, LinkedIn và GitHub trên nền xanh đậm tràn khung. **More projects** nằm dưới Selected Work. [Home](https://dennissnellenberg.com/) · [Work](https://dennissnellenberg.com/work) · [Case study TWICE](https://dennissnellenberg.com/work/twice) · [About](https://dennissnellenberg.com/about) · [Contact](https://dennissnellenberg.com/contact) · [Archive](https://dennissnellenberg.com/archive)

## Câu chuyện

Portfolio giúp người tuyển dụng nhận ra ngay **Kelvin Nguyen là AI Engineer**, xem được phần Kelvin trực tiếp xây và hiểu cách Kelvin tiếp tục học. Sự tò mò thể hiện qua những dự án đã làm, những quyết định kỹ thuật có thể giải thích và các ghi chú về paper đang đọc.

Câu giới thiệu đề xuất cho trang tiếng Anh

> I’m Kelvin Nguyen, an AI Engineer. I build AI systems, test where they fail, and write about what I learn.

Một câu ngắn hơn đã được thử trong các bản phác là **I build AI systems you can inspect.** Copy cuối cùng sẽ được chọn khi thiết kế màn Home.

Người xem có thể đi nhanh đến **Work**, **CV** hoặc **Experience**. Ai muốn khám phá có thể dùng bản đồ 2D để mở một dự án, thử demo rồi đọc case study. **Notes** cho thấy hành trình học vẫn đang tiếp diễn và là lối vào riêng cho người đến từ một bài viết.

Ưu tiên hiện tại là portfolio xin việc. Upwork là giai đoạn sau. Có thể mang các case study phù hợp sang portfolio trên Upwork khi đến giai đoạn đó. Hướng dẫn hiện hành về liên kết và thông tin liên hệ cần được kiểm tra lại lúc sử dụng. [Upwork Help](https://support.upwork.com/hc/en-us/articles/360016144974-How-to-enhance-your-freelancer-profile)

## Sitemap đã thống nhất

```text
Home
├── Work
│   ├── Reliable Agent Harness
│   ├── HealthLab Evidence Intelligence
│   ├── HarborMind
│   └── Dự án phụ
├── Notes
│   ├── Paper Notes
│   └── Build Notes
├── Experience
├── CV
└── Contact
```

- **Home** có tên, chức danh **AI Engineer**, bản đồ pixel 2D, đường vào Work và CV, Selected Work và một mục Latest Notes đọc được khi lướt.
- **Work** có danh sách dễ quét với tên, thời gian và một câu về đóng góp. Desktop có preview khi rê chuột hoặc focus. Mobile mở dự án khi chạm. Mỗi case study có URL riêng để gửi trực tiếp, ví dụ `/work/reliable-agent-harness`.
- **Case study** mở bằng một kết quả, cảnh hoặc demo. Sau đó trả lời bài toán là gì, Kelvin trực tiếp xây gì và đã kiểm chứng ra sao. Repo, demo, video và dataset xuất hiện gần nội dung liên quan.
- **Notes** là blog có từ bản đầu. Paper Notes ghi điều rút ra, giới hạn và câu hỏi còn mở. Build Notes ghi một quyết định, một thí nghiệm hoặc một thay đổi sau khi thử. Case study và bài viết liên kết hai chiều khi thật sự liên quan.
- **Experience, CV và Contact** dễ tìm. CV dùng file hiện có. Có thể đặt Experience và Contact trên Home hoặc tách route sau khi thử bố cục. Các mục Certifications và Skills hiện có sẽ được xem lại khi dàn trang, vì chưa chốt vị trí trong bản mới.

## Hướng visual và chuyển động

**Pixel art 2D là một phần của cách khám phá portfolio.** Bản đồ có các trạm dẫn tới dự án. Các cảnh và sprite nhỏ dựa trên nội dung công việc, như cổng phê duyệt của agent, tài liệu nguồn và cảng biển. Nội dung dài, tên dự án và nút điều hướng dùng typography rõ ràng. Bảng màu dịu, với sắc đậm tập trung vào thao tác và điểm cần chú ý.

Điều muốn học từ **Dennis Snellenberg** là cảm giác khi di chuột, preview đổi trạng thái, cách chuyển từ danh sách vào case study và cách quay lại đúng vị trí. Bố cục, nội dung, pixel art và hành vi trong bản đồ được thiết kế riêng cho Kelvin. [Trang Work](https://dennissnellenberg.com/work) · [Case study TWICE](https://dennissnellenberg.com/work/twice)

- Trên desktop, sprite hoặc lớp cảnh phản hồi với biên độ nhỏ, có easing và dừng êm khi chuột dừng. Preview trên danh sách phản hồi cả với hover và focus.
- Trên mobile, chạm vào trạm hoặc tên dự án là đủ để xem nội dung. Luôn có đường vào Work và case study qua điều hướng thông thường.
- Khi mở case study, thử giữ tiêu đề hoặc hình preview làm điểm nối thị giác. Khi quay về Work, giữ vị trí và đưa focus về dự án vừa xem. Chuyển động tôn trọng `prefers-reduced-motion`.
- Demo đầu dùng tình huống giả lập cho thao tác **Approve / Reject**. Hành động trong portfolio chỉ thay đổi trạng thái mô phỏng. Repo vẫn có hướng dẫn chạy bản dự án đầy đủ.

### Bảng màu làm việc

Kelvin chọn **Sương xanh** cho slide và bản chạy thử đầu tiên sau khi đối chiếu chat “Review portfolio project status”. Màu lấy từ phương án `mist` trong bản phác so màu.

| Vai trò | Màu |
|---|---|
| Nền xanh xám nhạt | `#F2F6FA` |
| Chữ navy | `#22354A` |
| Nút, link và trạng thái tương tác | `#355D85` |
| Nước và nền cảnh nhẹ | `#D3E6EB` |
| Đường đi, đất, mái và đường kẻ | `#B7CADB`, `#E7EDED`, `#8CABC4`, `#B7C9D8` |

Hai phương án trong cùng bản phác là **Giấy ngà & chàm** và **Xanh hồ**. [Bản phác so màu](work/portfolio-palette-options.html) · [Radix Colors về ghép blue và slate](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette)

## Nội dung và thứ tự dự án

Ngày hiển thị theo tháng và năm. Dự án làm trong một tháng dùng một mốc. Dự án đã kết thúc qua nhiều tháng dùng khoảng. Dự án đang làm dùng **Present**.

### Selected Work

1. **Reliable Agent Harness · Sep 2026.** Prototype trợ lý vận hành có CLI và HTTP API, kiểm tra input/output của tool, giới hạn retry và yêu cầu người duyệt đúng hành động trước khi tạo incident. Mở đầu bằng hai nhánh Approve/Reject trên dữ liệu giả lập. Repo ghi nhận 368 test offline đạt cho proof of concept. [Repo](https://github.com/dblue03333/reliable-agent-harness) · [Quick start](https://github.com/dblue03333/reliable-agent-harness#quick-start)
2. **HealthLab Evidence Intelligence · Oct 2026 – Present.** Pipeline thu thập bài viết y tế công cộng, lưu bằng chứng và tạo bản nháp newsletter về healthy ageing ở Việt Nam. Case study có thể minh họa một câu trong draft trỏ về bài nguồn công khai, rồi đến bước biên tập viên duyệt đúng phiên bản. Mô tả theo phạm vi newsletter pilot có người giám sát. [Repo công khai](https://github.com/dblue03333/healthlab-evidence-intelligence)
3. **HarborMind · Apr – May 2026.** Prototype hackathon chạy offline cho dự báo thời gian tàu chờ tại Long Beach. Cảnh chính cho thấy khi độ bất định cao thì hệ thống bàn giao quyết định cho thuyền trưởng. Dataset Kaggle là kết quả Kelvin xử lý từ AIS của NOAA MarineCadastre. Giữ bốn đích riêng. [Video demo](https://youtu.be/U6FTDtmo7Jc) · [Repo agent và dashboard](https://github.com/dblue03333/HarborMind) · [Repo pipeline dữ liệu và ML](https://github.com/dblue03333/Maritime-Congestion-Predictive-Modeling) · [Dataset Kaggle](https://www.kaggle.com/datasets/nguyenductuandat/lalb-ais-port-congestion-62023-122025)

### Dự án phụ và Experience

- **HealthLab Website · Oct 2026 – Present.** Website Astro responsive, có phần Kelvin đóng góp vào typography và triển khai thành phần theo Figma. Repo hiện private. Dùng mô tả hoặc màn hình được phép chia sẻ.
- **mini-llm-twin · Dec 2025 – Apr 2026.** Trợ lý kiến thức cá nhân dùng RAG. Trang chi tiết hiện có là nguồn nội dung cho một case study phụ. [Chi tiết hiện tại](pages/mini-llm-twin.html) · [Repo](https://github.com/dblue03333/mini-llm-twin)
- **AI Engineering Consultant — Safiri Logistics · May 2026 – Present.** Independent contract, mô tả ngắn ở mức vai trò. Công việc nội bộ của Safiri nằm ngoài Projects theo quyết định của Kelvin. Dùng các liên kết công khai đã chọn ở trên khi trình bày HarborMind.
- **Technical Contributor — HealthLab · Oct 2026 – Present.** Website và công cụ dữ liệu, biên tập cho newsletter pilot.
- **AI Engineering Contributor — ADIMI · Jun – Sep 2026.** Prototype Gemini từ tháng 6, tinh chỉnh prompt song ngữ, bộ lọc nhận xét và test suite vào tháng 9. Hiện nằm trong Experience.
- **DataMate** và nhóm **Previous Projects** đã được loại khỏi phạm vi portfolio. `AI Engineer` là headline cá nhân, còn `AI Engineering Consultant` là cách ghi vai trò tại Safiri.

## Notes và cách thêm nội dung

Nội dung hiện có trong repo sibling `Learning_hub` là điểm xuất phát. Ứng viên đầu tiên là note về machine learning trong geriatric care tại `../Learning_hub/research/Nov_2026/ml-geriatric-care/notes/paper-notes.md`. Dùng ghi chú đã biên tập và link nguồn bài báo khi viết bài. Thư mục `react-paper` hiện là khung đọc paper, phù hợp làm đề tài khi có nội dung đã viết.

Hướng triển khai đã thống nhất là thêm **một file Markdown cho mỗi dự án hoặc bài viết**. Tên, ngày, mô tả và nội dung sống cùng entry. Trang danh sách lấy từ các entry, trang Home lấy dự án được chọn và note mới nhất. Có thể thêm `slug`, `status`, link ngoài và liên kết với dự án hoặc note liên quan. Tên thư mục, metadata chính xác, cách build và framework vẫn là quyết định triển khai.

## Bản phác và nguồn tham chiếu

Các file trong `work/` là bản phác tương tác dạng HTML fragment. Dùng chúng để lấy ý đồ và thử hành vi. Trang chạy thực tế sẽ cần layout, route, điều hướng và tài nguyên riêng.

| Bản phác | Dùng để xem |
|---|---|
| [portfolio-directions.html](work/portfolio-directions.html) | Hai hướng Interactive Demo và Engineering Field Notes. Demo ở trang đầu, case study theo hướng editorial. |
| [portfolio-story.html](work/portfolio-story.html) | Home → Selected Work → Case study, preview theo hover/focus, thử Approve/Reject và quay về dự án. |
| [portfolio-blue-pixel.html](work/portfolio-blue-pixel.html) | Phối xanh thử ban đầu và cảnh dự báo HarborMind dạng pixel. |
| [portfolio-palette-options.html](work/portfolio-palette-options.html) | Bản phác gốc của Sương xanh. Ba palette trên cùng cảnh, sprite có easing theo chuột, ba trạm dự án và thao tác chọn trạm. |
| [Portfolio Design 01](page://page_604dcf03c72c8191b847c4a9f5a26b27) | Một slide Sương xanh, ba trạng thái desktop và cách xếp nội dung trên mobile. |
| [Bản chạy thử](work/preview/index.html) | Home, bản đồ pixel và Selected Work dẫn đến case study Reliable Agent Harness. Demo Approve hoặc Reject dùng dữ liệu giả lập. |

Các reference khác đã thảo luận gồm một tương tác chủ đạo ở Bruno Simon, các thử nghiệm nhỏ trong Craft của Rauno Freiberg, và nguyên tắc pixel rõ nét, dễ đọc từ Playdate. [Bruno Simon](https://bruno-simon.com/) · [Rauno Freiberg — Craft](https://rauno.me/craft) · [Designing for Playdate](https://help.play.date/developer/designing-for-playdate/)

## Trạng thái workspace và bước tiếp theo

- Workspace hiện là website tĩnh. [index.html](index.html) là homepage hiện tại, `css/` và [js/main.js](js/main.js) chứa giao diện và hành vi đang dùng. [assets/docs/CV.pdf](assets/docs/CV.pdf) là file đích của nút CV.
- Các bản cập nhật Experience, thứ tự Projects, link HarborMind, headline và ngày theo tháng hiện có trong working tree. Trang Netlify kiểm tra ngày 24/11/2026 vẫn có tiêu đề “Kelvin | AI & Data Engineer” và phần Featured Project cho HarborMind.
- Chat mở trên cùng workspace có thể đọc file này và các bản phác. Nếu dùng một worktree hoặc checkout mới, chuyển các thay đổi local cần thiết sang đó trước khi tiếp tục. Tại thời điểm viết, file handoff và thư mục `work/` chưa nằm trong commit.
- Luồng **Home → chọn trạm Reliable Agent Harness → mở case study** đã có slide và bản chạy ở `work/preview/`. Bản thử dùng HTML, CSS và JavaScript tĩnh, tiêu đề Georgia và chữ nội dung system sans. Ba trạm có phần giới thiệu ngắn. Case study của Harness có hai nhánh demo và liên kết repo. Hai dự án còn lại dẫn đến repo công khai.
- Đã thử trên Chrome desktop và ở chiều rộng mobile 390 px và 320 px. Các bước kiểm tra gồm chọn trạm bằng bàn phím và thao tác chạm, hover/focus trong Selected Work, quay lại đúng điểm đã mở, Approve/Reject, giảm chuyển động và mở CV.
- Bản chạy thử dùng CV có sẵn và liên kết Experience, Contact về homepage hiện tại. Sau khi xem luồng đầu, tiếp tục case study HealthLab, HarborMind và mục Latest Notes.
- Các mục cần chốt cho site gồm artwork cuối, font, timing chuyển cảnh, framework, quy ước thư mục Markdown, route cho Experience/Contact và bài Notes đầu tiên.

## Prompt mở chat mới

> Đọc `PORTFOLIO_CONTEXT.md` trước và ưu tiên mục **Hướng cập nhật ngày 25/11/2026**. Tiếp tục từ bản preview Sương xanh với HealthLab mở đầu và luồng Home → Selected Work → Case Study. Dùng trang Work của Dennis làm tham chiếu về chuyển động. Giữ nội dung dự án, thứ tự Selected Work và phạm vi công khai trong file. Ghi lại quyết định mới và trạng thái triển khai vào file này trước khi kết thúc.
