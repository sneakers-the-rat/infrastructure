\NeedsTeXFormat{LaTeX2e}[1994/06/01]

\ProvidesClass{tufte-infrastructure}[2015/06/30 v3.5.3 Tufte-book class]

%%
% Declare we're tufte-book
\newcommand{\@tufte@class}{book}% the base LaTeX class (defaults to the article/handout style)
\newcommand{\@tufte@pkgname}{tufte-infrastructure}% the name of the package (defaults to tufte-handout)



%%
% Load the common style elements
\input{tufte-common.def}

% set Garamond as main font!


%%
% Set up any book-specific stuff now

%%
% The front matter in Tufte's /Beautiful Evidence/ contains everything up
% to the opening page of Chapter 1.  The running heads, when they appear,
% contain only the (arabic) page number in the outside corner.
%\newif\if@mainmatter \@mainmattertrue
\renewcommand\frontmatter{%
  \if@openright%
    \cleardoublepage%
  \else%
    \clearpage%
  \fi%
  \@mainmatterfalse%
  \pagenumbering{arabic}%
  %\pagestyle{plain}%
  \fancyhf{}%
  \ifthenelse{\boolean{@tufte@twoside}}%
    {\fancyhead[LE,RO]{\thepage}}%
    {\fancyhead[RE,RO]{\thepage}}%
}


%%
% The main matter in Tufte's /Beautiful Evidence/ doesn't restart the page
% numbering---it continues where it left off in the front matter.
\renewcommand\mainmatter{%
  % \if@openright%
  %   \cleardoublepage%
  % \else%
  %   \clearpage%
  % \fi%
  \@mainmattertrue%
  \fancyhf{}%
  \ifthenelse{\boolean{@tufte@twoside}}%
    {% two-side
      \renewcommand{\chaptermark}[1]{\markboth{##1}{}}%
      \fancyhead[LE]{\thepage\quad\smallcaps{\newlinetospace{\plaintitle}}}% book title
      \fancyhead[RO]{\smallcaps{\newlinetospace{\leftmark}}\quad\thepage}% chapter title
    }%
    {% one-side
      \fancyhead[RE,RO]{\smallcaps{\newlinetospace{\plaintitle}}\quad\thepage}% book title
    }%
}


%%
% The back matter contains appendices, indices, glossaries, endnotes,
% biliographies, list of contributors, illustration credits, etc.
\renewcommand\backmatter{%
  % \if@openright%
  %   \cleardoublepage%
  % \else%
  %   \clearpage%
  % \fi%
  \@mainmatterfalse%
}

%%
% Only show the chapter titles in the table of contents
\setcounter{tocdepth}{0}

%%
% If there is a `tufte-book-local.sty' file, load it.

\IfFileExists{tufte-book-local.tex}{%
  \@tufte@info@noline{Loading tufte-book-local.tex}%
  \input{tufte-book-local}%
}{}

%%
% End of file


% redo title formatting
\titleformat{\part}%
  [display]% shape
  {\relax\ifthenelse{\NOT\boolean{@tufte@symmetric}}{\begin{fullwidth}}{}}% format applied to label+text
  {\Huge\sffamily\bfseries\thepart}% label
  {0pt}% horizontal separation between label and title body
  {\Huge\sffamily\bfseries}% before the title body
  [\ifthenelse{\NOT\boolean{@tufte@symmetric}}{\end{fullwidth}}{}]% after the title body

\titleformat{\chapter}%
  [display]% shape
  {\relax\ifthenelse{\NOT\boolean{@tufte@symmetric}}{\begin{fullwidth}}{}}% format applied to label+text
  {\itshape\huge\thechapter}% label
  {0pt}% horizontal separation between label and title body
  {\huge\rmfamily\itshape}% before the title body
  [\ifthenelse{\NOT\boolean{@tufte@symmetric}}{\end{fullwidth}}{}]% after the title body

\titleformat{\section}%
  [hang]% shape
  {\normalfont\Large\itshape}% format applied to label+text
  {\thesection}% label
  {1em}% horizontal separation between label and title body
  {}% before the title body
  []% after the title body

\titleformat{\subsection}%
  [hang]% shape
  {\normalfont\large\itshape}% format applied to label+text
  {\thesubsection}% label
  {1em}% horizontal separation between label and title body
  {}% before the title body
  []% after the title body

\titleformat{\paragraph}%
  [runin]% shape
  {\normalfont\itshape}% format applied to label+text
  {\theparagraph}% label
  {1em}% horizontal separation between label and title body
  {}% before the title body
  []% after the title body

\titlespacing*{\chapter}{0pt}{50pt}{40pt}
\titlespacing*{\section}{0pt}{3.5ex plus 1ex minus .2ex}{2.3ex plus .2ex}
\titlespacing*{\subsection}{0pt}{3.25ex plus 1ex minus .2ex}{1.5ex plus.2ex}


\renewcommand\thesubsubsection{\thesubsection.\@arabic\c@subsubsection}

\renewcommand\subsubsection{\@startsection{subsubsection}{3}{\z@}%
{-3.25ex\@plus -1ex \@minus -.2ex}%
{1.5ex \@plus .2ex}%
{\normalfont\normalsize\bfseries}}


\usepackage{setspace}
\makeatletter
\renewcommand{\maketitle}{
  \global\@topnum\z@% prevent floats from being placed at the top of the page
  \thispagestyle{empty}%
  \sffamily%
  \begin{fullwidth}%
  {\normalfont\raggedright\fontsize{60}{66}\selectfont\noindent\textbf{Decentralized\break Infrastructure for\hfill\break (Neuro)science}\par\vspace{6pt}}
  {\normalfont\fontsize{30}{32}\selectfont\textit{Or, Kill the Cloud in your Mind}\\}
  \end{fullwidth}
  \vspace{6pc}%
  \begin{spacing}{0.5}
  \selectfont\par\noindent\Large{\textbf\thanklessauthor \href{mailto:j@nny.fyi}{@}}\vspace{6pt}\\
  %
  {\normalfont\noindent\textcolor{darkgray}\footnotesize%
  University of Oregon\\
  Institute of Neuroscience, Department of Psychology\\
  Eugene, OR 97403, United States}
  % %\affils
  \end{spacing}
{\vspace{16pt}\fontsize{16}{16}Original Publication: August 27, 2022\\%
Compiled: \thedate\\%
Version: \input{git-version.tex}\\%
Document Source: \\}%
{\fontsize{14}{16}\url{https://github.com/sneakers-the-rat/infrastructure}}\\%

This document was written for the web. The PDF is primarily for archival purposes, and may be out of date --- note the compile date and version number. Please see the original at:\\
{\fontsize{14}{16}\url{https://jon-e.net/infrastructure}}
  \normalfont
}
% \makebox[0pt][l]{%
%   \raisebox{-27.1pc}[0pt][0pt]{%
%     \hspace{15pc}\includegraphics[width=4.25in]{figures/autopilot_logo_titlepage.pdf}}}

\makeatother


\endinput
