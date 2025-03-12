+++
title = "Human cortex isoform data"
Description = "Long-read sequencing reveals novel transcripts in human cortex, with age-related differences"
date = 2024-06-01
[params]
    author = "Kartik Chundru"
title = "brainisoforms"
layout = "blog"
+++

# Human cortex isoform data
We used long-read transcriptome sequencing to characterise the structure and
abundance of full-length transcripts in the human cortex from donors aged 6
weeks post-conception to 83 years old. We identified thousands of novel
transcripts, with dramatic differences in the diversity of expressed
transcripts between prenatal and postnatal cortex. A large proportion of these
previously uncharacterised transcripts have high coding potential, with
corresponding peptides detected in proteomic data. Novel putative coding
sequences are highly conserved and overlap de novo mutations in genes linked
with neurodevelopmental disorders in individuals with relevant clinical
phenotypes. Our findings underscore the potential of novel coding sequences to
harbor clinically relevant variants, offering new insights into the genetic
architecture of human disease. Please refer to
[Bamford](https://www.biorxiv.org/content/10.1101/2024.05.24.595768v1) et al.
(2024) for more details.

## Database and annotations
A summary of isoform expression values across samples (PEXT scores) is
available in the
[LRBrainCoverage](https://chundruvk.shinyapps.io/LRBrainCoverage/) app. 

All UCSC tracks corresponding to data presented in the paper are available on
the '[Human Cortex Transcriptome](https://genome.ucsc.edu/s/rb520/IsoformTrackHub)' 
Track Hub or individually:

1. Default annotations related to the transcripts described in our paper
   [here](https://genome.ucsc.edu/s/rb520/relaxed). 
2. A version of the dataset which is processed with
   [default](https://genome.ucsc.edu/s/rb520/default) SQANTI3 parameters to
exclude non-canonical splice junctions. 
3. A version of the dataset which has been
   [filtered](https://genome.ucsc.edu/s/rb520/10reads10samples)  to exclude
very rare transcripts (minimum 10 reads across 10 samples)
4. A version of the dataset processed using the
   [Bambu](https://genome.ucsc.edu/s/rb520/bambu) analysis pipeline (Chen Y. et
al. 2023). All tracks have been filtered to include a minimum of two
full-length reads across two samples, and all reads flagged as artefacts by
SQANTI3.
5. Tracks generated from 
[direct (native) RNA](https://genome.ucsc.edu/s/rb520/dRNA) sequencing on a
subset of samples.

Raw sequencing data is available in the Sequence Read Archive (SRA) database
(https://www.ncbi.nlm.nih.gov/sra) under accession numbers PRJNA1117615 and
PRJNA1129050. 

Processed intermediate data and targeted probe panels are available for
download at [Zenodo](https://zenodo.org/).
