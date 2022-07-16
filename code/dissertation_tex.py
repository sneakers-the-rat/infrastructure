import pypandoc
from pathlib import Path
import typing
import re
import pdb


def jekyll_to_tex(
        path: typing.Union[Path, str],
        output: typing.Optional[typing.Union[Path, str]] = None,
        document_class: str = "article",
        document_class_options: list = [],
        title: str = "",
        author: str = "",
        date: str = "\\today",
        load_packages: list = [],
        additional_calls: list = [()],
        toc: bool = True,
        domain: typing.Optional[str] = None,
        img_root: typing.Optional[str] = None,
        strip: typing.Optional[list] = None):
    path = Path(path)
    if output is not None:
        output = Path(output).with_suffix('.tex')

    with open(path, 'r') as tfile:
        text = tfile.read()

    # prestrip headings for references and footnotes
    text = re.sub(r'# References', '', text)
    text = re.sub(r'# Footnotes', '', text)

    # replace relative includes
    # pdb.set_trace()
    text = re.sub(r'\{% include_relative\s(.*)\s%\}', include, text)

    text = pypandoc.convert_text(text, format='markdown', to='tex',
                                 extra_args=["--highlight-style=pygments",
                                             "--pdf-engine=xelatex",
                                             '--top-level-division=chapter'])



    # text-wide alterations
    # fix cite calls
    text = re.compile(r'(?s)\\\{\\%[^\\]*cite(.*?)\\%\\\}').sub(r'\\citep{\1} ', text)
    # fix cites spearated with space not comma
    # text = re.compile(r'(?s)(?<=\\cite\{)\s*(\S*)\s*([^\s]*)\s').sub(r'\1,\2', text)
    # pdb.set_trace()
    text = re.compile(r"(?s)(?<=\\citep\{).*?\s.*?(?=\})").sub(split_cites, text)

    # replace multicols
    # pdb.set_trace()

    if domain is not None or img_root is not None:
        text = fix_relative_links(text, domain, img_root)

    if strip is not None:
        for to_strip in strip:
            text = re.compile(to_strip).sub('', text)

    text = re.compile(r'(?s)\\footnote').sub(r'\\sidenote', text)

    # change TOC depth during draft
    text = re.compile(r'(?=\\hypertarget{shared-data)').sub(r'\\changelocaltocdepth{2}\n', text)

    if output is not None:
        with open(output, 'w') as out_f:
            out_f.write(text)

    return text


def build_frontmatter(document_class: str = "article",
                      document_class_options: list = [],
                      title: str = "",
                      author: str = "",
                      date: str = "\\today",
                      load_packages: list = [],
                      additional_calls: list = [()],
                      toc: bool = True):
    if len(document_class_options) == 0:
        doc_class = f"\\documentclass{{{document_class}}}\n"
    else:
        doc_class_opts = ', '.join(document_class_options)
        doc_class = f"\\documentclass[{doc_class_opts}]{{{document_class}}}\n"

    # add packages
    packs = '\n'.join([tex_call('usepackage', pack) for pack in load_packages])

    # declare title and author and date
    title = tex_call('title', title)
    author = tex_call('author', author)
    date = tex_call('date', date)

    # add any other calls
    calls = '\n'.join([tex_call(call[0], call[1]) for call in additional_calls])

    # combine
    return '\n'.join((doc_class, packs, title, author, date, calls))


def include(match):
    # pdb.set_trace()
    path = (Path(__file__).parent / '../').resolve() / match.groups()[0]
    with open(path, 'r') as includef:
        include_text = includef.read()

    # recursive
    if re.search(r'\{% include_relative', include_text) is not None:
        include_text = re.sub(r'\{% include_relative\s(.*)\s%\}', include, include_text)

    return include_text


def split_cites(match):
    match_text = str(match.group(0).strip())
    splitted = [cite.strip() for cite in re.split(r'\s|\n', match_text) if len(cite) > 0]
    return ', '.join(splitted)


def tex_call(function, argument=None):
    if argument is None:
        return f"\\{function}"
    else:
        return f"\\{function}{{{argument}}}"


def fix_relative_links(text, href=None, includegraphics=None):
    # fix \href{/link}
    if href is not None:
        text = re.compile(r'(?<=\\href\{)(/[^}]*)').sub(fr'{href}\1', text)
    # and \includegraphics{/link}
    if includegraphics is not None:
        text = re.compile(r'(?<=\\includegraphics\{)(/[^}]*)').sub(fr'{includegraphics}\1', text)
    return text


if __name__ == "__main__":
    in_fn = (Path(__file__).parent / '../index.markdown').absolute()
    out_fn = (Path(__file__).parent / '../tex/infrastructure_dissertation_render.tex').absolute()

    print(f'Converting {in_fn} to .tex...')
    document_class = 'dissertation'

    text = jekyll_to_tex(
        in_fn,
        document_class=document_class,
        document_class_options=['nohyper'],
        title="Decentralized Infrastructure for Neuro(science)",
        author="Jonny L. Saunders",
        date="\\today",
        load_packages=[],
        additional_calls=[('addbibresource', '../assets/infrastructure.bib')],
        toc=True,
        domain='https://jon-e.net',
        img_root='.',
        strip=(
            r'\\tightlist',
            r'(?s)\\footnote\{\\begin\{quote\}\n\s*\\ldots.*neuroscientists\}',
            r'(?s)\\footnote\{\\begin\{quote\}\n\s*"Among the.*\\end\{quote\}\}'))

    text = re.compile(r'(?<=\\includegraphics\{)/blog([^}]*)').sub(
        fr'{"/Users/jonny/git/sneakers-the-rat.github.io/_preblog"}\1', text)
    # text = re.compile(r'\\begin\{quote\}').sub(r'\\begin{leftbar}', text)
    # text = re.compile(r'\\end\{quote\}').sub(r'\\end{leftbar}', text)
    text = re.compile(r'(?<=\\includegraphics)(\{[^}]*})').sub(r'[width=\\linewidth]\1', text)
    # fix relative links to images
    text = re.compile(r'(?<=\\includegraphics\[width=\\linewidth\]\{)/infrastructure').sub(r'..', text)
    # strip that one \cite{d} that always shows up
    text = re.compile(r"\\cite\{d\}").sub('', text)
    # svg to png
    text = re.compile(r"\.svg").sub(r'.png', text)

    with open(out_fn, 'w') as out_f:
        out_f.write(text)

    print(f'Wrote tex to {out_fn}')


